package com.myapp.silk.repository;

import com.myapp.silk.domain.HoSoCn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the HoSoCn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoSoCnRepository extends JpaRepository<HoSoCn, Long> {

}
