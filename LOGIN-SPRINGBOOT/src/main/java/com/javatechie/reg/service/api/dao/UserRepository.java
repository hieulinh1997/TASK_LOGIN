package com.javatechie.reg.service.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javatechie.reg.service.api.model.User;

import java.util.List;

/**														
 * UserRepository interface extends JpaRepository to use JPA					
 *														
 * @author ivs 														
 */	
public interface UserRepository extends JpaRepository<User,Integer> {
	
    List<User> findByEmail(String email_id);

}
