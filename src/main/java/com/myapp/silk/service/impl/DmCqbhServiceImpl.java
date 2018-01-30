package com.myapp.silk.service.impl;

import com.myapp.silk.service.DmCqbhService;
import com.myapp.silk.domain.DmCqbh;
import com.myapp.silk.repository.DmCqbhRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing DmCqbh.
 */
@Service
@Transactional
public class DmCqbhServiceImpl implements DmCqbhService {

    private final Logger log = LoggerFactory.getLogger(DmCqbhServiceImpl.class);

    private final DmCqbhRepository dmCqbhRepository;

    public DmCqbhServiceImpl(DmCqbhRepository dmCqbhRepository) {
        this.dmCqbhRepository = dmCqbhRepository;
    }

    /**
     * Save a dmCqbh.
     *
     * @param dmCqbh the entity to save
     * @return the persisted entity
     */
    @Override
    public DmCqbh save(DmCqbh dmCqbh) {
        log.debug("Request to save DmCqbh : {}", dmCqbh);
        return dmCqbhRepository.save(dmCqbh);
    }

    /**
     * Get all the dmCqbhs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DmCqbh> findAll(Pageable pageable) {
        log.debug("Request to get all DmCqbhs");
        return dmCqbhRepository.findAll(pageable);
    }

    /**
     * Get one dmCqbh by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DmCqbh findOne(Long id) {
        log.debug("Request to get DmCqbh : {}", id);
        return dmCqbhRepository.findOne(id);
    }

    /**
     * Delete the dmCqbh by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DmCqbh : {}", id);
        dmCqbhRepository.delete(id);
    }
}
