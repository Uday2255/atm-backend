package com.atm.controller;

import com.atm.model.TransactionHistory;
import com.atm.model.UserAccount;
import com.atm.service.UserService;
import com.atm.dto.ChangePinRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // REGISTER — accepts name, pin, balance from frontend
    @PostMapping("/register")
    public UserAccount register(@RequestBody UserAccount user) {
        return service.register(user);   // ← service handles account number only
    }

    @PostMapping("/login")
    public UserAccount login(@RequestBody UserAccount user) {
        return service.login(user.getAccountNumber(), user.getPin());
    }

    @GetMapping("/balance/{acc}")
    public UserAccount getBalance(@PathVariable Long acc) {
        return service.getBalance(acc);
    }

    @PostMapping("/deposit/{acc}/{amount}")
    public UserAccount deposit(@PathVariable Long acc, @PathVariable double amount) {
        return service.depositAndReturnUser(acc, amount);
    }

    @PostMapping("/withdraw/{acc}/{amount}")
    public UserAccount withdraw(@PathVariable Long acc, @PathVariable double amount) {
        return service.withdrawAndReturnUser(acc, amount);
    }

    @PostMapping("/changepin/{acc}")
    public UserAccount changePin(@PathVariable Long acc, @RequestBody ChangePinRequest req) {
        return service.changePinAndReturnUser(acc, req.getOldPin(), req.getNewPin());
    }

    @GetMapping("/history/{acc}")
    public List<TransactionHistory> getHistory(@PathVariable Long acc) {
        return service.getHistory(acc);
    }
}