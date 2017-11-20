import { Injectable } from '@angular/core';
import {School} from './school/school';
import { Department } from './department/department';
import { Course } from './course/course';
import {SCHOOLS, DEPTS, COURSES} from './mock-data'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
const cudOptions = { headers: new Headers({ 'Content-Type': 'application/json' })};

@Injectable()
export class FakeYacsService {

  schoolsUrl=`api/schools`;
  deptsUrl='api/departments';
  coursesUrl='api/courses';
  constructor(private http: Http) { }

  getSchools(): Observable<School[]>{
    return this.http.get(this.schoolsUrl)
            //.do(data => console.log(data)) 
            .map(res=>res.json())
            .catch(this.handleError);
  }

  getDepts(): Observable<Department[]>{
    return this.http.get(this.deptsUrl)
            .map(res=> res.json())
            .catch(this.handleError);
  }

  getCourses(): Observable<Course[]>{
    return of(COURSES); 
  }

  getDeptByID(id: number): Observable<Department>{
    const url=`${this.deptsUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
            .do(data => console.log(data.json() as Department))
            .map((r: Response) => r.json() as Department)
            .catch(this.handleError);
  }
  
  getCourseByID(id: number): Observable<Course>{
    return of(COURSES.filter(course => course.id === id)[0]);
  }
  
  getSchoolByID(id: number): Observable<School>{
    return of(SCHOOLS.filter(school => school.id === id)[0]);
  }
  
  getCoursesByDeptID(dept_id: number): Observable<Course[]>{
    return of(COURSES.filter(course => course.department_id === dept_id));

  }

  protected handleError (error: any){
    console.error(error);
    return Observable.throw(error);
  }
}
