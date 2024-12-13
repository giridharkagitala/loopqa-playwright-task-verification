require('dotenv').config();

async function login(page) {
  // Navigate to the base URL
  await page.goto(process.env.BASE_URL);

  // Fill the login form
  await page.fill('#username', process.env.EMAIL); // Username field identified by `id="username"`
  await page.fill('#password', process.env.PASSWORD); // Password field identified by `id="password"`

  // Click the "Sign in" button
  await page.click('button:has-text("Sign in")'); // Button identified by its visible text "Sign in"
}

module.exports = { login };
