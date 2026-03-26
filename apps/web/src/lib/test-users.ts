// Test Users for SarkariSaathi Demo
export const testUsers = [
  {
    name: "रमेश कुमार",
    phone: "9876543210",
    email: "ramesh.kumar@example.com",
    password: "password123",
    role: "USER",
    state: "उत्तर प्रदेश",
    district: "लखनऊ"
  },
  {
    name: "सीमा देवी",
    phone: "9876543211", 
    email: "seema.dev@example.com",
    password: "password123",
    role: "USER",
    state: "मध्य प्रदेश",
    district: "भोपाल"
  },
  {
    name: "अमित सिंह",
    phone: "9876543212",
    email: "amit.singh@example.com", 
    password: "password123",
    role: "USER",
    state: "राजस्थान",
    district: "जयपुर"
  },
  {
    name: "प्रिया शर्मा",
    phone: "9876543213",
    email: "priya.sharma@example.com",
    password: "password123", 
    role: "USER",
    state: "महाराष्ट्र",
    district: "मुंबई"
  },
  {
    name: "राहुल वर्मा",
    phone: "9876543214",
    email: "rahul.verma@example.com",
    password: "password123",
    role: "USER", 
    state: "गुजरात",
    district: "अहमदाबाद"
  }
]

export function getTestUser(index: number = 0) {
  return testUsers[index] || testUsers[0]
}

export function getAllTestUsers() {
  return testUsers
}
