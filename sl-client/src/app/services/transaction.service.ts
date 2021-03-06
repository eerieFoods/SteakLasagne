import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {Transaction} from "../models/transaction.model";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = `${environment.baseApiUrl}/transaction`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTransactions(userId?: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.url}/user/${userId}/`)
      .pipe(
        tap(_ => this.messageService.log("fetched all transactions")),
        catchError(this.messageService.handleError<Transaction[]>('getTransactions', []))
      );
  }

/*  getTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.url}/${transaction.id}/`)
      .pipe(
        tap(_ => this.messageService.log(`fetched transaction with id ${transaction.id}`)),
        catchError(this.messageService.handleError<Transaction>('getTransaction'))
      );
  }*/

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url, transaction, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`created transaction with id ${transaction.id}`)),
        catchError(this.messageService.handleError<Transaction>('createTransaction'))
      );
  }

  updateTransaction(transaction: Transaction): Observable <any> {
    return this.http.put<any>(this.url, transaction, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.log(`updated transaction with id ${transaction.id}`)),
        catchError(this.messageService.handleError<any>('updateTransaction'))
      );
  }

  deleteTransaction(id: string, returnObservable?: boolean): (void | Observable<any>) {
    const deleteUrl = `${this.url}/${id}`;

    const result = this.http.delete(deleteUrl)
      .pipe(
        tap(_ => this.messageService.log(`deleted transaction with id ${id}`)),
        catchError(this.messageService.handleError('deleteTransaction'))
      );
    if (returnObservable)
      return result;
    else
      result.subscribe();
  }
}
