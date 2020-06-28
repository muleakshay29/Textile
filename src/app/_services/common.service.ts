import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../_helper/delete-confirmation/delete-confirmation.component";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class CommonService {
  bsModalRef: BsModalRef;
  API_URL = `http://localhost:3000/`;
  // API_URL = `https://textile-app95.herokuapp.com/`;

  constructor(private modalService: BsModalService, private http: HttpClient) {}

  openModalWithComponent(Name: string, _id: string) {
    const initialState = {
      message: "Are you sure to delete " + Name + "?",
      title: "Delete Confirmation",
    };

    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState,
    });

    return this.bsModalRef;
  }

  addData(formData, customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http.post<any>(URL, formData, httpOptions);
  }

  getItemCount(customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http.get<any>(URL, httpOptions);
  }

  fetchData(
    pageIndex: number = 1,
    pageSize: number,
    customURL
  ): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http.get<any>(URL, {
      params: new HttpParams()
        .set("pageIndex", pageIndex.toString())
        .set("pageSize", pageSize.toString()),
    });
  }

  fetchAllData(customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http.get<any>(URL, httpOptions);
  }

  fetchDataFrom(_id: string, customURL: string): Observable<any> {
    const URL = `${this.API_URL}${customURL}/${_id}`;
    return this.http.get<any>(URL, httpOptions);
  }

  findData(data: any, customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http.post<any>(URL, data);
  }

  deleteData(_id, customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}/${_id}`;
    return this.http.delete<any>(URL, httpOptions);
  }

  fetchDetails(_id, customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}/${_id}`;
    return this.http.get<any>(URL, httpOptions);
  }

  updateData(_id, data, customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}/${_id}`;
    return this.http.patch<any>(URL, data, httpOptions);
  }
}
