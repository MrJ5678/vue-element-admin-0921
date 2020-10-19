<!--
 * @Author: hhhhhq
 * @Date: 2020-09-29 17:12:40
 * @LastEditors: hhhhhq
 * @LastEditTime: 2020-09-29 17:22:34
 * @Description: Role manage
-->

<template>
  <div class="app-container">
    <el-card>
      <!-- 导航 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb> -->
      <!-- 添加按钮 -->
      <div class="addRoleBtn">
        <el-button type="primary" icon="el-icon-plus" @click="handleAddRole">添加角色</el-button>
      </div>
      <el-table v-loading="listLoading" :data="roleLists" style="width: 100%" border :header-cell-style="{ background: '#F5F7FA', color: '#606266' }">
        <!-- <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1, index) of scope.row.sub_menu" :key="index">
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1)">{{ item1.pname }}</el-tag>
                <i class="el-icon-caret-right" />
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, index) of item1.sub_menu" :key="index">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{ item2.pname }}</el-tag>
                    <i class="el-icon-caret-right" />
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3) in item2.sub_menu"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{ item3.pname }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>-->
        <el-table-column type="index" label="#" width="50px" align="center" />
        <el-table-column label="角色名称" prop="role_name" />
        <el-table-column label="角色状态" prop="type" width="100px" align="center" />
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              size="mini"
              @click="showRemoveDialog(scope.row)"
            >删除</el-button>
            <el-button
              type="text"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="total"
      />
    </div>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <!-- 树状展示 -->
      <el-tree
        ref="treeRef"
        :data="rightsList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        :props="defaultProps"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色对话框 -->
    <el-dialog v-if="showAddRoleVisible" title="添加角色" :visible.sync="showAddRoleVisible">
      <el-form ref="addRoleForm" :model="addRoleForm" :rules="addRoleFormRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName" autocomplete="off" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddRoleDialog">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog v-if="showEditRoleVisible" title="编辑角色" :visible.sync="showEditRoleVisible">
      <el-form ref="editRoleForm" :model="editRoleForm" :rules="editRoleFormRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName" autocomplete="off" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="启停用状态">
          <el-switch v-model="editRoleForm.roleStatus" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditRoleDialog">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRole, addRole, editRole, delRole, setPermission } from '@/api/admin/role'
import { getPower, getPermissionOfRole } from '@/api/admin/permission'

export default {
  data() {
    return {
      // 表格加载状态
      listLoading: false,
      // 角色id
      roleId: -1,
      // 角色列表
      roleLists: [],
      // 添加角色对话框状态
      showAddRoleVisible: false,
      // 编辑角色对话框状态
      showEditRoleVisible: false,
      // 添加角色表单
      addRoleForm: {
        roleName: '',
        roleStatus: true
      },
      editRoleForm: {
        roleName: '',
        roleStatus: true
      },
      // 添加角色表单验证
      addRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      editRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      // 添加角色按钮状态
      addRoleDialogVisible: false,
      // 树状组件的显示配置
      defaultProps: {
        children: 'sub_menu',
        label: 'pname'
      },
      // 默认选中节点ID值
      defKeys: [],
      // 分配权限框
      setRightDialogVisible: false,
      // 权限列表
      rightsList: []
    }
  },
  computed: {
    total() {
      return this.roleLists.length
    }
  },
  async created() {
    this.getRoleList()
    this.getPowerList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      try {
        this.listLoading = true
        const res = await getRole()
        if (res && res.code === 1) {
          res.data.forEach((item) => {
            item.type === '1' ? (item.type = '使用') : (item.type = '停用')
          })
          // console.log(res.data);
          this.roleLists = res.data
          this.listLoading = false
        }
      } catch (error) {
        this.listLoading = false
      }
    },
    // 获取权限列表
    async getPowerList() {
      try {
        const res = await getPower()
        // console.log(res);
        if (res.code === 1) {
          this.rightsList = res.data
        }
      } catch (error) {
        this.$message.error('获取权限列表失败! ')
      }
    },
    // 展示编辑角色对话框
    showEditDialog(role) {
      // console.log(role)
      const { id, role_name } = role
      // console.log(id, role_name);
      this.roleId = id
      this.roleName = role_name
      this.showEditRoleVisible = true
    },

    // 展示分配权限对话框
    async showSetRightDialog(role) {
      this.setRightDialogVisible = true
      // 赋值当前角色id
      this.roleId = role.id
      this.getPowerList()
      // console.log(this.roleId)
      // console.log(this.rightsList)
      // 展示对话框
      // 获取当前角色下的权限
      const params = { rid: this.roleId }
      try {
        const res = await getPermissionOfRole(params)
        // console.log(res)
        if (res && res.code === 1) {
          this.defKeys = res.data
          // console.log(this.defKeys)
        }
      } catch (error) {
        this.$message.error('获取当前角色权限失败! ')
        this.roleId = -1
        this.setRightDialogVisible = false
      }
    },
    // 删除角色事件
    async showRemoveDialog(role) {
      // console.log(role)
      // 弹框提示 删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => this.$message.error('操作失败！请稍后再试！'))
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消权限删除')
      }
      const { id } = role
      try {
        const res = await delRole({ id })
        if (res.code === 1) {
          this.$message.success('删除角色信息成功！')
          this.getRoleList()
        }
      } catch (error) {
        this.$message.error('删除角色信息失败！')
      }
    },
    // 分配权限对话框关闭事件
    setRightDialogClosed() {
      this.roleId = -1
      this.rightsList = []
    },
    // 确定分配权限事件
    async allotRights() {
      // console.log(this.roleId)
      // 获取当前roldId defKeys
      // 获得当前选中和半选中的Id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys)
      const params = {
        role_id: this.roleId,
        power_id_list: keys
      }
      // console.log(params)
      try {
        const res = await setPermission(params)
        // console.log(res);
        if (res.code === 1) {
          this.$message.success('分配权限成功！')
          this.$forceUpdate()
        }
        this.roleId = -1
        this.setRightDialogVisible = false
      } catch (error) {
        this.roleId = -1
        this.setRightDialogVisible = false
      }
    },

    // 添加角色对话框
    handleAddRole() {
      this.showAddRoleVisible = true
    },

    // 取消添加角色对话框
    closeAddRoleDialog() {
      this.showAddRoleVisible = false
    },

    // 确定添加
    addRole() {
      // 验证新增角色表单 内容不为空
      this.showAddPermissionVisible = false
      this.$refs.addRoleForm.validate(async(valid) => {
        // console.log(valid)
        // 验证失败
        if (!valid) return
        const params = {
          role_name: this.addRoleForm.roleName
        }
        // console.log(params)
        try {
          const res = await addRole(params)
          // console.log(res)
          if (res && res.code === 1) {
            // this.roleName = ''
            this.$refs.addRoleForm.resetFields()
            this.$message.success('新增角色成功！')
            this.showAddRoleVisible = false
            // this.getPowerList()
          }
        } catch (error) {
          this.$refs.addRoleForm.resetFields()
          this.showAddPermissionVisible = false
        }
      })
    },

    // 确定编辑
    editRole() {
      // 验证编辑表单 内容不为空
      this.$refs.editRoleForm.validate(async(valid) => {
        // console.log(valid)
        // 验证失败
        if (!valid) return
        this.editRoleForm.roleStatus = this.editRoleForm.roleStatus ? '1' : '2'
        // console.log(this.editRoleForm.roleStatus)
        const params = {
          id: this.roleId,
          role_name: this.editRoleForm.roleName,
          type: this.editRoleForm.roleStatus
        }
        // console.log(params)
        try {
          const res = await editRole(params)
          if (res.code === 1) {
            this.roleId = -1
            this.roleName = ''
            // console.log(this.roleId, this.roleName)
            this.$refs.editRoleForm.resetFields()
            this.showEditRoleVisible = false
            this.$message.success('更新角色信息成功！')
            this.getRoleList()
          }
        } catch (error) {
          this.roleId = -1
          this.roleName = ''
          this.$refs.editRoleForm.resetFields()
          this.showEditRoleVisible = false
        }
      })
    },

    // 取消编辑对话框
    closeEditRoleDialog() {
      this.showEditRoleVisible = false
    }
    // 点击树状节点事件
    // handleCheckChange(data) {
    //   console.log(data.id);
    //   console.log(this.defKeys);
    //   console.log(this.defKeys.includes(data.id));
    //   if(this.defKeys.includes(data.id)) {
    //     // 已有数组包含点击项 -> 去除
    //     this.defKeys = this.defKeys.filter(defKey => defKey !== data.id)
    //     console.log(this.defKeys);
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.addRoleBtn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.cell {
  .el-button--text:nth-child(2) { color: #f56c6c; }
  .el-button--text:nth-child(3) { color: #e6a23c; }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
