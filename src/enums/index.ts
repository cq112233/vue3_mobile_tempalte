
enum TradingStatus {
    CONNECTING = 0, // 连接中
    OPEN = 1, // 开启中
    CLOSING = 2, // 关闭中
    CLOSED = 3 // 关闭
}

// 管理员类型

enum ManagerType {
    ADMIN = 1, // 超级管理员
    CHILD = 2 // 子账号
}

// 用户状态

enum UserStatus {
    '正常' = 1,
    '禁用' = 2,
    '请假' = 3,
    '注销' = 4
}

// 雇佣状态

enum EmploymentStatus {
    '在职' = 0,
    '离职' = 1,
    '退休' = 2,
}

// 管理员类型

enum CompanyStatus {
    '有效' = 1, // 有效
}

export default {
  TradingStatus,
  ManagerType,
  UserStatus,
  EmploymentStatus,
  CompanyStatus
}
