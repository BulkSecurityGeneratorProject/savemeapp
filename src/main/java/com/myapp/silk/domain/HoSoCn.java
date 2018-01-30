package com.myapp.silk.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A HoSoCn.
 */
@Entity
@Table(name = "ho_so_cn")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HoSoCn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "ma_so", nullable = false)
    private String maSo;

    @NotNull
    @Column(name = "ho_ten", nullable = false)
    private String hoTen;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "gioi_tinh")
    private Integer gioiTinh;

    @Column(name = "dia_chi")
    private String diaChi;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaSo() {
        return maSo;
    }

    public HoSoCn maSo(String maSo) {
        this.maSo = maSo;
        return this;
    }

    public void setMaSo(String maSo) {
        this.maSo = maSo;
    }

    public String getHoTen() {
        return hoTen;
    }

    public HoSoCn hoTen(String hoTen) {
        this.hoTen = hoTen;
        return this;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public HoSoCn ngaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
        return this;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public Integer getGioiTinh() {
        return gioiTinh;
    }

    public HoSoCn gioiTinh(Integer gioiTinh) {
        this.gioiTinh = gioiTinh;
        return this;
    }

    public void setGioiTinh(Integer gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public HoSoCn diaChi(String diaChi) {
        this.diaChi = diaChi;
        return this;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        HoSoCn hoSoCn = (HoSoCn) o;
        if (hoSoCn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hoSoCn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HoSoCn{" +
            "id=" + getId() +
            ", maSo='" + getMaSo() + "'" +
            ", hoTen='" + getHoTen() + "'" +
            ", ngaySinh='" + getNgaySinh() + "'" +
            ", gioiTinh=" + getGioiTinh() +
            ", diaChi='" + getDiaChi() + "'" +
            "}";
    }
}
