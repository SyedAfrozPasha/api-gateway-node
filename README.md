# api-gateway-node

## Quick start

1. Clone the repo

   ```bash
   git clone https://github.com/SyedAfrozPasha/api-gateway-node.git
   ```

2. Go to the project root folder

   ```bash
   cd api-gateway-node
   ```

   - **Note:** If you don't want to manually enter the credentials on every push/pull, then run the below command to set the credentials in git config. Replace `<USERNAME>` with your user name and `<PASSWORD>` with your password. If your password has `@` in it, then replace it in url with `%40`

     ```bash
     git remote set-url origin https://<USERNAME>:<PASSWORD>@github.com/SyedAfrozPasha/api-gateway-node.git
     ```

3. Install dependencies

   ```bash
   npm install
   ```

4. To run the server at port 8080 (<http://localhost:8080>)

   ```bash
   npm run dev
   ```

5. To run the test cases

   ```bash
   npm run test
   ```
