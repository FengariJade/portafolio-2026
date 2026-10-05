import { inject, Injectable } from '@angular/core';
import { CreatePackageDto, CreateProductDto, PackageListParams, UpdateProductDto} from '../models/package.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class PackageCommandService {

  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/packages`;

  /** POST /v1/packages */
  createPackage(dto: CreatePackageDto) {
    return this.http.post(this.base, dto);
  }

  // ── PRODUCTOS ─────────────────────────────────────────

  /** GET /v1/packages/:package_id/products */
  getProductsByPackage(packageId: string) {
    return this.http.get(`${this.base}/${packageId}/products`);
  }

  /** POST /v1/packages/:package_id/products */
  addProduct(packageId: string, dto: CreateProductDto) {
    return this.http.post(`${this.base}/${packageId}/products`, dto);
  }

  /** GET /v1/packages/:package_id/products/:product_id */
  getProductById(packageId: string, productId: string) {
    return this.http.get(`${this.base}/${packageId}/products/${productId}`);
  }

  /** PUT /v1/packages/:package_id/products/:product_id */
  updateProduct(packageId: string, productId: string, dto: UpdateProductDto) {
    return this.http.put(
      `${this.base}/${packageId}/products/${productId}`,
      dto
    );
  }

  /** DELETE /v1/packages/:package_id/products/:product_id */
  deleteProduct(packageId: string, productId: string) {
    return this.http.delete(`${this.base}/${packageId}/products/${productId}`);
  }
  
}
