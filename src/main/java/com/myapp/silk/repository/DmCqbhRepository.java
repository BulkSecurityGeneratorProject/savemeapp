package com.myapp.silk.repository;

import com.myapp.silk.domain.DmCqbh;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DmCqbh entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DmCqbhRepository extends JpaRepository<DmCqbh, Long> {

}
