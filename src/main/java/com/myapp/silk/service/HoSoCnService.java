package com.myapp.silk.service;

import com.myapp.silk.domain.HoSoCn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing HoSoCn.
 */
public interface HoSoCnService {

    /**
     * Save a hoSoCn.
     *
     * @param hoSoCn the entity to save
     * @return the persisted entity
     */
    HoSoCn save(HoSoCn hoSoCn);

    /**
     * Get all the hoSoCns.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<HoSoCn> findAll(Pageable pageable);

    /**
     * Get the "id" hoSoCn.
     *
     * @param id the id of the entity
     * @return the entity
     */
    HoSoCn findOne(Long id);

    /**
     * Delete the "id" hoSoCn.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
