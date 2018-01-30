package com.myapp.silk.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.myapp.silk.domain.HoSoCn;
import com.myapp.silk.service.HoSoCnService;
import com.myapp.silk.web.rest.errors.BadRequestAlertException;
import com.myapp.silk.web.rest.util.HeaderUtil;
import com.myapp.silk.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HoSoCn.
 */
@RestController
@RequestMapping("/api")
public class HoSoCnResource {

    private final Logger log = LoggerFactory.getLogger(HoSoCnResource.class);

    private static final String ENTITY_NAME = "hoSoCn";

    private final HoSoCnService hoSoCnService;

    public HoSoCnResource(HoSoCnService hoSoCnService) {
        this.hoSoCnService = hoSoCnService;
    }

    /**
     * POST  /ho-so-cns : Create a new hoSoCn.
     *
     * @param hoSoCn the hoSoCn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hoSoCn, or with status 400 (Bad Request) if the hoSoCn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ho-so-cns")
    @Timed
    public ResponseEntity<HoSoCn> createHoSoCn(@Valid @RequestBody HoSoCn hoSoCn) throws URISyntaxException {
        log.debug("REST request to save HoSoCn : {}", hoSoCn);
        if (hoSoCn.getId() != null) {
            throw new BadRequestAlertException("A new hoSoCn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HoSoCn result = hoSoCnService.save(hoSoCn);
        return ResponseEntity.created(new URI("/api/ho-so-cns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ho-so-cns : Updates an existing hoSoCn.
     *
     * @param hoSoCn the hoSoCn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hoSoCn,
     * or with status 400 (Bad Request) if the hoSoCn is not valid,
     * or with status 500 (Internal Server Error) if the hoSoCn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ho-so-cns")
    @Timed
    public ResponseEntity<HoSoCn> updateHoSoCn(@Valid @RequestBody HoSoCn hoSoCn) throws URISyntaxException {
        log.debug("REST request to update HoSoCn : {}", hoSoCn);
        if (hoSoCn.getId() == null) {
            return createHoSoCn(hoSoCn);
        }
        HoSoCn result = hoSoCnService.save(hoSoCn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hoSoCn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ho-so-cns : get all the hoSoCns.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of hoSoCns in body
     */
    @GetMapping("/ho-so-cns")
    @Timed
    public ResponseEntity<List<HoSoCn>> getAllHoSoCns(Pageable pageable) {
        log.debug("REST request to get a page of HoSoCns");
        Page<HoSoCn> page = hoSoCnService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ho-so-cns");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ho-so-cns/:id : get the "id" hoSoCn.
     *
     * @param id the id of the hoSoCn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hoSoCn, or with status 404 (Not Found)
     */
    @GetMapping("/ho-so-cns/{id}")
    @Timed
    public ResponseEntity<HoSoCn> getHoSoCn(@PathVariable Long id) {
        log.debug("REST request to get HoSoCn : {}", id);
        HoSoCn hoSoCn = hoSoCnService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hoSoCn));
    }

    /**
     * DELETE  /ho-so-cns/:id : delete the "id" hoSoCn.
     *
     * @param id the id of the hoSoCn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ho-so-cns/{id}")
    @Timed
    public ResponseEntity<Void> deleteHoSoCn(@PathVariable Long id) {
        log.debug("REST request to delete HoSoCn : {}", id);
        hoSoCnService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
