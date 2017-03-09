package com.protoslab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Created by Wojtek on 09.03.2017.
 */

@RestController
@Component
@Service
public class ContactController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    ContactRepository contactRepository;

//    @RequestMapping("/greeting")
//    public Contact greeting(@RequestParam(value="name", defaultValue="World") String name) {
//        return new Contact(counter.incrementAndGet(),
//                String.format(template, name));
//    }

    @RequestMapping("/contacts")

    public List<Contact> getAllContacts(){
        return contactRepository.findAll(new PageRequest(1,10)).getContent();
//        return "hello";
    }
}
