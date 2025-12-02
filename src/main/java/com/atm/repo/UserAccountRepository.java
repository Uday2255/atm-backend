package com.atm.repo;

import com.atm.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    // For login
    Optional<UserAccount> findByAccountNumberAndPin(Long accountNumber, String pin);

    // For balance, deposit, withdraw, etc.
    Optional<UserAccount> findByAccountNumber(Long accountNumber);

    // THIS IS SUPER IMPORTANT — FOR UNIQUE PHONE NUMBER CHECK
    boolean existsByPhone(String phone);
}