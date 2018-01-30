package com.myapp.silk.web.rest;

import com.myapp.silk.SavemeappApp;

import com.myapp.silk.domain.HoSoCn;
import com.myapp.silk.repository.HoSoCnRepository;
import com.myapp.silk.service.HoSoCnService;
import com.myapp.silk.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.myapp.silk.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HoSoCnResource REST controller.
 *
 * @see HoSoCnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SavemeappApp.class)
public class HoSoCnResourceIntTest {

    private static final String DEFAULT_MA_SO = "AAAAAAAAAA";
    private static final String UPDATED_MA_SO = "BBBBBBBBBB";

    private static final String DEFAULT_HO_TEN = "AAAAAAAAAA";
    private static final String UPDATED_HO_TEN = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_NGAY_SINH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_SINH = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_GIOI_TINH = 1;
    private static final Integer UPDATED_GIOI_TINH = 2;

    private static final String DEFAULT_DIA_CHI = "AAAAAAAAAA";
    private static final String UPDATED_DIA_CHI = "BBBBBBBBBB";

    @Autowired
    private HoSoCnRepository hoSoCnRepository;

    @Autowired
    private HoSoCnService hoSoCnService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHoSoCnMockMvc;

    private HoSoCn hoSoCn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HoSoCnResource hoSoCnResource = new HoSoCnResource(hoSoCnService);
        this.restHoSoCnMockMvc = MockMvcBuilders.standaloneSetup(hoSoCnResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HoSoCn createEntity(EntityManager em) {
        HoSoCn hoSoCn = new HoSoCn()
            .maSo(DEFAULT_MA_SO)
            .hoTen(DEFAULT_HO_TEN)
            .ngaySinh(DEFAULT_NGAY_SINH)
            .gioiTinh(DEFAULT_GIOI_TINH)
            .diaChi(DEFAULT_DIA_CHI);
        return hoSoCn;
    }

    @Before
    public void initTest() {
        hoSoCn = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoSoCn() throws Exception {
        int databaseSizeBeforeCreate = hoSoCnRepository.findAll().size();

        // Create the HoSoCn
        restHoSoCnMockMvc.perform(post("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoSoCn)))
            .andExpect(status().isCreated());

        // Validate the HoSoCn in the database
        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeCreate + 1);
        HoSoCn testHoSoCn = hoSoCnList.get(hoSoCnList.size() - 1);
        assertThat(testHoSoCn.getMaSo()).isEqualTo(DEFAULT_MA_SO);
        assertThat(testHoSoCn.getHoTen()).isEqualTo(DEFAULT_HO_TEN);
        assertThat(testHoSoCn.getNgaySinh()).isEqualTo(DEFAULT_NGAY_SINH);
        assertThat(testHoSoCn.getGioiTinh()).isEqualTo(DEFAULT_GIOI_TINH);
        assertThat(testHoSoCn.getDiaChi()).isEqualTo(DEFAULT_DIA_CHI);
    }

    @Test
    @Transactional
    public void createHoSoCnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hoSoCnRepository.findAll().size();

        // Create the HoSoCn with an existing ID
        hoSoCn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoSoCnMockMvc.perform(post("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoSoCn)))
            .andExpect(status().isBadRequest());

        // Validate the HoSoCn in the database
        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMaSoIsRequired() throws Exception {
        int databaseSizeBeforeTest = hoSoCnRepository.findAll().size();
        // set the field null
        hoSoCn.setMaSo(null);

        // Create the HoSoCn, which fails.

        restHoSoCnMockMvc.perform(post("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoSoCn)))
            .andExpect(status().isBadRequest());

        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHoTenIsRequired() throws Exception {
        int databaseSizeBeforeTest = hoSoCnRepository.findAll().size();
        // set the field null
        hoSoCn.setHoTen(null);

        // Create the HoSoCn, which fails.

        restHoSoCnMockMvc.perform(post("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoSoCn)))
            .andExpect(status().isBadRequest());

        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHoSoCns() throws Exception {
        // Initialize the database
        hoSoCnRepository.saveAndFlush(hoSoCn);

        // Get all the hoSoCnList
        restHoSoCnMockMvc.perform(get("/api/ho-so-cns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hoSoCn.getId().intValue())))
            .andExpect(jsonPath("$.[*].maSo").value(hasItem(DEFAULT_MA_SO.toString())))
            .andExpect(jsonPath("$.[*].hoTen").value(hasItem(DEFAULT_HO_TEN.toString())))
            .andExpect(jsonPath("$.[*].ngaySinh").value(hasItem(DEFAULT_NGAY_SINH.toString())))
            .andExpect(jsonPath("$.[*].gioiTinh").value(hasItem(DEFAULT_GIOI_TINH)))
            .andExpect(jsonPath("$.[*].diaChi").value(hasItem(DEFAULT_DIA_CHI.toString())));
    }

    @Test
    @Transactional
    public void getHoSoCn() throws Exception {
        // Initialize the database
        hoSoCnRepository.saveAndFlush(hoSoCn);

        // Get the hoSoCn
        restHoSoCnMockMvc.perform(get("/api/ho-so-cns/{id}", hoSoCn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hoSoCn.getId().intValue()))
            .andExpect(jsonPath("$.maSo").value(DEFAULT_MA_SO.toString()))
            .andExpect(jsonPath("$.hoTen").value(DEFAULT_HO_TEN.toString()))
            .andExpect(jsonPath("$.ngaySinh").value(DEFAULT_NGAY_SINH.toString()))
            .andExpect(jsonPath("$.gioiTinh").value(DEFAULT_GIOI_TINH))
            .andExpect(jsonPath("$.diaChi").value(DEFAULT_DIA_CHI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHoSoCn() throws Exception {
        // Get the hoSoCn
        restHoSoCnMockMvc.perform(get("/api/ho-so-cns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoSoCn() throws Exception {
        // Initialize the database
        hoSoCnService.save(hoSoCn);

        int databaseSizeBeforeUpdate = hoSoCnRepository.findAll().size();

        // Update the hoSoCn
        HoSoCn updatedHoSoCn = hoSoCnRepository.findOne(hoSoCn.getId());
        // Disconnect from session so that the updates on updatedHoSoCn are not directly saved in db
        em.detach(updatedHoSoCn);
        updatedHoSoCn
            .maSo(UPDATED_MA_SO)
            .hoTen(UPDATED_HO_TEN)
            .ngaySinh(UPDATED_NGAY_SINH)
            .gioiTinh(UPDATED_GIOI_TINH)
            .diaChi(UPDATED_DIA_CHI);

        restHoSoCnMockMvc.perform(put("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHoSoCn)))
            .andExpect(status().isOk());

        // Validate the HoSoCn in the database
        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeUpdate);
        HoSoCn testHoSoCn = hoSoCnList.get(hoSoCnList.size() - 1);
        assertThat(testHoSoCn.getMaSo()).isEqualTo(UPDATED_MA_SO);
        assertThat(testHoSoCn.getHoTen()).isEqualTo(UPDATED_HO_TEN);
        assertThat(testHoSoCn.getNgaySinh()).isEqualTo(UPDATED_NGAY_SINH);
        assertThat(testHoSoCn.getGioiTinh()).isEqualTo(UPDATED_GIOI_TINH);
        assertThat(testHoSoCn.getDiaChi()).isEqualTo(UPDATED_DIA_CHI);
    }

    @Test
    @Transactional
    public void updateNonExistingHoSoCn() throws Exception {
        int databaseSizeBeforeUpdate = hoSoCnRepository.findAll().size();

        // Create the HoSoCn

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHoSoCnMockMvc.perform(put("/api/ho-so-cns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoSoCn)))
            .andExpect(status().isCreated());

        // Validate the HoSoCn in the database
        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHoSoCn() throws Exception {
        // Initialize the database
        hoSoCnService.save(hoSoCn);

        int databaseSizeBeforeDelete = hoSoCnRepository.findAll().size();

        // Get the hoSoCn
        restHoSoCnMockMvc.perform(delete("/api/ho-so-cns/{id}", hoSoCn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HoSoCn> hoSoCnList = hoSoCnRepository.findAll();
        assertThat(hoSoCnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HoSoCn.class);
        HoSoCn hoSoCn1 = new HoSoCn();
        hoSoCn1.setId(1L);
        HoSoCn hoSoCn2 = new HoSoCn();
        hoSoCn2.setId(hoSoCn1.getId());
        assertThat(hoSoCn1).isEqualTo(hoSoCn2);
        hoSoCn2.setId(2L);
        assertThat(hoSoCn1).isNotEqualTo(hoSoCn2);
        hoSoCn1.setId(null);
        assertThat(hoSoCn1).isNotEqualTo(hoSoCn2);
    }
}
