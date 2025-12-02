package com.atm.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_accounts")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String phone;                    // INDIAN PHONE NUMBER

    @Column(unique = true, nullable = false)
    private Long accountNumber;

    @Column(nullable = false)
    private String pin;

    @Column(nullable = false)
    private double balance = 0.0;
}