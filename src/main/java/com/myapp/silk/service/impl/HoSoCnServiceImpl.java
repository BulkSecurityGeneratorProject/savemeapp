package com.myapp.silk.service.impl;

import com.myapp.silk.service.HoSoCnService;
import com.myapp.silk.domain.HoSoCn;
import com.myapp.silk.repository.HoSoCnRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing HoSoCn.
 */
@Service
@Transactional
public class HoSoCnServiceImpl implements HoSoCnService {

    private final Logger log = LoggerFactory.getLogger(HoSoCnServiceImpl.class);

    private final HoSoCnRepository hoSoCnRepository;

    public HoSoCnServiceImpl(HoSoCnRepository hoSoCnRepository) {
        this.hoSoCnRepository = hoSoCnRepository;
    }

    /**
     * Save a hoSoCn.
     *
     * @param hoSoCn the entity to save
     * @return the persisted entity
     */
    @Override
    public HoSoCn save(HoSoCn hoSoCn) {
        log.debug("Request to save HoSoCn : {}", hoSoCn);
        return hoSoCnRepository.save(hoSoCn);
    }

    /**
     * Get all the hoSoCns.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HoSoCn> findAll(Pageable pageable) {
        log.debug("Request to get all HoSoCns");
        return hoSoCnRepository.findAll(pageable);
    }

    /**
     * Get one hoSoCn by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public HoSoCn findOne(Long id) {
        log.debug("Request to get HoSoCn : {}", id);
        return hoSoCnRepository.findOne(id);
    }

    /**
     * Delete the hoSoCn by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HoSoCn : {}", id);
        hoSoCnRepository.delete(id);
    }
}
