package com.myapp.silk.service;

import com.myapp.silk.domain.DmCqbh;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing DmCqbh.
 */
public interface DmCqbhService {

    /**
     * Save a dmCqbh.
     *
     * @param dmCqbh the entity to save
     * @return the persisted entity
     */
    DmCqbh save(DmCqbh dmCqbh);

    /**
     * Get all the dmCqbhs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DmCqbh> findAll(Pageable pageable);

    /**
     * Get the "id" dmCqbh.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DmCqbh findOne(Long id);

    /**
     * Delete the "id" dmCqbh.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
