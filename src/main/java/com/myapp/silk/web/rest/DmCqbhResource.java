package com.myapp.silk.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.myapp.silk.domain.DmCqbh;
import com.myapp.silk.service.DmCqbhService;
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
 * REST controller for managing DmCqbh.
 */
@RestController
@RequestMapping("/api")
public class DmCqbhResource {

    private final Logger log = LoggerFactory.getLogger(DmCqbhResource.class);

    private static final String ENTITY_NAME = "dmCqbh";

    private final DmCqbhService dmCqbhService;

    public DmCqbhResource(DmCqbhService dmCqbhService) {
        this.dmCqbhService = dmCqbhService;
    }

    /**
     * POST  /dm-cqbhs : Create a new dmCqbh.
     *
     * @param dmCqbh the dmCqbh to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dmCqbh, or with status 400 (Bad Request) if the dmCqbh has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dm-cqbhs")
    @Timed
    public ResponseEntity<DmCqbh> createDmCqbh(@Valid @RequestBody DmCqbh dmCqbh) throws URISyntaxException {
        log.debug("REST request to save DmCqbh : {}", dmCqbh);
        if (dmCqbh.getId() != null) {
            throw new BadRequestAlertException("A new dmCqbh cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DmCqbh result = dmCqbhService.save(dmCqbh);
        return ResponseEntity.created(new URI("/api/dm-cqbhs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dm-cqbhs : Updates an existing dmCqbh.
     *
     * @param dmCqbh the dmCqbh to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dmCqbh,
     * or with status 400 (Bad Request) if the dmCqbh is not valid,
     * or with status 500 (Internal Server Error) if the dmCqbh couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dm-cqbhs")
    @Timed
    public ResponseEntity<DmCqbh> updateDmCqbh(@Valid @RequestBody DmCqbh dmCqbh) throws URISyntaxException {
        log.debug("REST request to update DmCqbh : {}", dmCqbh);
        if (dmCqbh.getId() == null) {
            return createDmCqbh(dmCqbh);
        }
        DmCqbh result = dmCqbhService.save(dmCqbh);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dmCqbh.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dm-cqbhs : get all the dmCqbhs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dmCqbhs in body
     */
    @GetMapping("/dm-cqbhs")
    @Timed
    public ResponseEntity<List<DmCqbh>> getAllDmCqbhs(Pageable pageable) {
        log.debug("REST request to get a page of DmCqbhs");
        Page<DmCqbh> page = dmCqbhService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dm-cqbhs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /dm-cqbhs/:id : get the "id" dmCqbh.
     *
     * @param id the id of the dmCqbh to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dmCqbh, or with status 404 (Not Found)
     */
    @GetMapping("/dm-cqbhs/{id}")
    @Timed
    public ResponseEntity<DmCqbh> getDmCqbh(@PathVariable Long id) {
        log.debug("REST request to get DmCqbh : {}", id);
        DmCqbh dmCqbh = dmCqbhService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dmCqbh));
    }

    /**
     * DELETE  /dm-cqbhs/:id : delete the "id" dmCqbh.
     *
     * @param id the id of the dmCqbh to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dm-cqbhs/{id}")
    @Timed
    public ResponseEntity<Void> deleteDmCqbh(@PathVariable Long id) {
        log.debug("REST request to delete DmCqbh : {}", id);
        dmCqbhService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
