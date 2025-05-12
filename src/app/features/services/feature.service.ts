import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FeatureItem, FeatureResponse } from '../models/feature.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/features`;

  // Get all features with pagination
  getFeatures(page: number = 1, pageSize: number = 10): Observable<FeatureResponse> {
    // For demo purposes, returning mock data
    const mockData: FeatureResponse = {
      items: [
        {
          id: 1,
          title: 'Sample Feature',
          description: 'This is a sample feature',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active'
        }
      ],
      total: 1,
      page: page,
      pageSize: pageSize
    };
    return of(mockData);

    // Uncomment below for real API implementation
    // return this.http.get<FeatureResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  // Get feature by ID
  getFeatureById(id: number): Observable<FeatureItem> {
    // For demo purposes
    return of({
      id: id,
      title: 'Sample Feature',
      description: 'This is a sample feature',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    });

    // Uncomment below for real API implementation
    // return this.http.get<FeatureItem>(`${this.apiUrl}/${id}`);
  }

  // Create new feature
  createFeature(feature: Omit<FeatureItem, 'id' | 'createdAt' | 'updatedAt'>): Observable<FeatureItem> {
    // For demo purposes
    return of({
      ...feature,
      id: Math.floor(Math.random() * 1000),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Uncomment below for real API implementation
    // return this.http.post<FeatureItem>(this.apiUrl, feature);
  }

  // Update feature
  updateFeature(id: number, feature: Partial<FeatureItem>): Observable<FeatureItem> {
    // For demo purposes
    return of({
      ...feature,
      id: id,
      updatedAt: new Date()
    } as FeatureItem);

    // Uncomment below for real API implementation
    // return this.http.patch<FeatureItem>(`${this.apiUrl}/${id}`, feature);
  }

  // Delete feature
  deleteFeature(id: number): Observable<void> {
    // For demo purposes
    return of(void 0);

    // Uncomment below for real API implementation
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
