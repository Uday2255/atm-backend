
# ATM Banking System – Full-Stack Java + HTML/CSS/JS

A complete, modern, and visually stunning ATM simulation that looks and works exactly like a real Indian bank (SBI / HDFC) ATM. Built with love, passion, and attention to every tiny detail.

# Key Features
Secure user registration & login (4-digit PIN).
Real note-based deposit system (100, 200, 500 rupee notes – just like a physical ATM).
Cash withdrawal with proper rules (minimum ₹100, only multiples of 100).
Balance enquiry.
Change PIN option.
Transaction history.
Gorgeous animated background (glowing blue dots gently falling from the top).
Centred, animated success popup with golden account number display.
Fully responsive – works perfectly on mobile phones and desktops.
Indian mobile number validation + duplicate phone prevention.
Session management + back-button protection (user cannot go back after logout).
Professional Spring Boot REST API backend with H2 in-memory database.

# Technology Stack
Backend  :   Java 21 + Spring Boot 3
Frontend :   HTML5, CSS3, Vanilla JavaScript
Database :   H2 (in-memory)
API      :   RESTful JSON
Styling  :   Pure CSS + CSS Animations

# Main REST API Endpoints
POST                           /api/register                                 for Create new account,
POST                           /api/login                                    for Authenticate with account no + PIN,
POST                          /api/deposit/{accountNumber}/{amount}          for Deposit cash,
POST                          /api/withdraw/{accountNumber}/{amount}         for Withdraw cash,
GET                           /api/balance/{accountNumber}                   for Get current balance,
GET                           /api/history/{accountNumber}                   for Transaction history. 
