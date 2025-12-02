package com.atm.service;

import com.atm.model.TransactionHistory;
import com.atm.model.UserAccount;
import com.atm.repo.TransactionHistoryRepository;
import com.atm.repo.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserAccountRepository repo;
    private final TransactionHistoryRepository historyRepo;

    public UserService(UserAccountRepository repo, TransactionHistoryRepository historyRepo) {
        this.repo = repo;
        this.historyRepo = historyRepo;
    }

    private Long generateAccountNumber() {
        return 10000000L + (long)(Math.random() * 90000000L);
    }

    // REGISTER — WITH PHONE + UNIQUE CHECK
    public UserAccount register(UserAccount user) {
        if (user.getPhone() != null && repo.existsByPhone(user.getPhone())) {
            throw new RuntimeException("This phone number is already registered!");
        }
        user.setAccountNumber(generateAccountNumber());
        return repo.save(user);
    }

    // LOGIN
    public UserAccount login(Long accNumber, String pin) {
        return repo.findByAccountNumberAndPin(accNumber, pin)
                .orElseThrow(() -> new RuntimeException("Invalid Account Number or PIN"));
    }

    // BALANCE
    public UserAccount getBalance(Long accNumber) {
        return repo.findByAccountNumber(accNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // DEPOSIT — MINIMUM ₹500
    public UserAccount depositAndReturnUser(Long accNumber, double amount) {
        if (amount < 500) {
            throw new RuntimeException("Minimum deposit amount is ₹500");
        }

        UserAccount user = repo.findByAccountNumber(accNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBalance(user.getBalance() + amount);
        repo.save(user);
        saveHistory(accNumber, "Deposit", amount);
        return user;
    }

    // WITHDRAWAL — MIN ₹100 + MULTIPLE OF 100
    public UserAccount withdrawAndReturnUser(Long accNumber, double amount) {
        UserAccount user = repo.findByAccountNumber(accNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (amount < 100) {
            throw new RuntimeException("Minimum withdrawal amount is ₹100");
        }
        if (amount % 100 != 0) {
            throw new RuntimeException("Withdrawal amount must be multiple of ₹100");
        }
        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient Balance!");
        }

        user.setBalance(user.getBalance() - amount);
        repo.save(user);
        saveHistory(accNumber, "Withdraw", amount);
        return user;
    }

    // CHANGE PIN
    public UserAccount changePinAndReturnUser(Long accNumber, String oldPin, String newPin) {
        UserAccount user = repo.findByAccountNumber(accNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPin().equals(oldPin)) {
            throw new RuntimeException("Current PIN is incorrect");
        }
        user.setPin(newPin);
        repo.save(user);
        return user;
    }

    // HISTORY
    public List<TransactionHistory> getHistory(Long accNumber) {
        return historyRepo.findByAccountNumber(accNumber);
    }

    private void saveHistory(Long accNumber, String type, double amount) {
        TransactionHistory h = new TransactionHistory();
        h.setAccountNumber(accNumber);
        h.setType(type);
        h.setAmount(amount);
        h.setDateTime(LocalDateTime.now());
        historyRepo.save(h);
    }
}