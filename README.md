# OWASP Top 10 Vulnerabilities

This document demonstrates three vulnerabilities from the OWASP Top 10, including real-world examples, steps to patch the vulnerabilities, and prevention tools.

---

## **1. Broken Access Control**

### **Real-World Example**
- **Incident**: Microsoft Power Apps Misconfiguration (2021)
- **Details**:
  - Microsoft Power Apps exposed sensitive data, including contact tracing information, vaccination statuses, and Social Security numbers, due to a misconfigured access control system.
  - Public APIs were unintentionally accessible without authentication.
  - **Source**: [TechCrunch Report](https://techcrunch.com/2021/08/23/microsoft-power-apps-misconfiguration-data-exposure/)

### **Steps to Patch**
1. Use proper authentication and role validation:
   - Validate users using a secure token system (e.g., JWT).
   - Fetch roles from a trusted source.
2. **Fixed Code**:
   ```javascript
   app.get("/admin", (req, res) => {
     const token = req.headers.authorization?.split(" ")[1];
     if (!token) {
       return res.status(401).send("Token required");
     }
     try {
       const decoded = jwt.verify(token, SECRET_KEY);
       const user = users.find((u) => u.username === decoded.username);
       if (!user || user.role !== "admin") {
         return res.status(403).send("Access Denied!");
       }
       res.send("Welcome to the admin panel!");
     } catch (err) {
       res.status(401).send("Invalid Token");
     }
   });
   ```

### **Prevention Tools and Processes**
- Use role-based access control (RBAC).
- Regularly audit APIs for misconfigurations.
- Use security scanners like Burp Suite to detect unauthorized access.

---

## **2. Injection**

### **Real-World Example**
- **Incident**: SolarWinds Orion SQL Injection (2020)
- **Details**:
  - Attackers exploited an SQL injection vulnerability in the SolarWinds Orion platform to access sensitive data and compromise systems.
  - **Source**: [SecurityWeek Report](https://www.securityweek.com/solarwinds-sql-injection-vulnerability-allows-full-system-compromise)

### **Steps to Patch**
1. Use parameterized queries to sanitize input:
   ```javascript
   app.get("/search", (req, res) => {
     const query = req.query.name;
     const sql = "SELECT * FROM users WHERE name = ?";
     db.all(sql, [query], (err, rows) => {
       if (err) {
         res.status(500).send("Error!");
       } else {
         res.json(rows);
       }
     });
   });
   ```

### **Prevention Tools and Processes**
- Use ORMs like Sequelize or Prisma.
- Perform regular database security audits.
- Test endpoints with tools like SQLMap for injection vulnerabilities.

---

## **3. Authentication Failures**

### **Real-World Example**
- **Incident**: Uber 2022 Data Breach
- **Details**:
  - An attacker used stolen credentials and bypassed multi-factor authentication to access Uber’s internal systems.
  - **Source**: [The Verge Report](https://www.theverge.com/2022/9/16/23356095/uber-security-hack-lapsus-attack-internal-systems)

### **Steps to Patch**
1. Use a strong, rotating secret key and store it securely.
2. Add expiration to JWT tokens:
   ```javascript
   const token = jwt.sign(
     { username: user.username, role: user.role },
     SECRET_KEY,
     { expiresIn: "1h" }
   );
   ```
3. Validate roles on the server side:
   ```javascript
   const user = users.find((u) => u.username === decoded.username);
   if (!user || user.role !== "admin") {
     return res.status(403).send("Access denied");
   }
   ```

### **Prevention Tools and Processes**
- Implement multi-factor authentication (MFA).
- Monitor authentication attempts with tools like Splunk or Datadog.
- Regularly rotate secrets and validate token integrity.

