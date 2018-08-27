import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Project } from './project';

export class ProjectData implements InMemoryDbService {
  createDb(){
    const projects: Project[] = [
      {
        'id': 1,
        'projectName': 'Angular NgRx: Getting Started',
        'projectCode': 'JS-NG-101',
        'description': 'NgRx is a powerful library for organizing and managing state and interactions with that state in your Angular applications using the redux pattern. This course gets you started with NgRx including a store, actions, reducers, effects, and selectors.',
        'starRating': 5
      },
      {
        'id': 2,
        'projectName': 'React Fundamentals',
        'projectCode': 'JS-React-101',
        'description': 'React is one of the world\'s most popular libraries for creating web user interfaces. This course will teach you how to confidently construct React applications that are simple and easy to maintain.',
        'starRating': 3.2
      },
      {
        'id': 3,
        'projectName': 'Vue.js Fundamentals',
        'projectCode': 'JS-VueJS-101',
        'description': 'Vue.js is rapidly growing in popularity due to its ease-of-use. This course will teach you all the fundamentals of Vue development including creating components, directives, filters, routing, Vuex state management, and deploying to production.',
        'starRating': 4.5
      },
      {
        'id': 4,
        'projectName': 'Firebase Firestore: Getting Started',
        'projectCode': 'DB-Firebase-101',
        'description': 'Cloud Firestore is a NoSQL document database that lets you easily work with data at a global scale. This course will teach you the basics of Cloud Firestore, including basic syntax, adding, managing, querying, and securing data.',
        'starRating': 4.6
      },
      {
        'id': 5,
        'projectName': 'Best Practices for Responsive Web-forms',
        'projectCode': 'HTML-CSS-101',
        'description': 'This course will help you make the web a better place by designing easy to use forms that encourage form completion.',
        'starRating': 3.7
      },
      {
        'id': 6,
        'projectName': 'Advanced Node.js',
        'projectCode': 'JS-NodeJS-201',
        'description': 'Learn advanced techniques for asynchronous programming and data streaming in Node.js. In this course, instructor Alex Banks shows how to use asynchronous patterns such as callbacks, promises, and async/await to manage processes and enforce sequential, parallel, and concurrent execution. He then reviews streams, a critical feature for reading and writing data from Node applications. He introduces the four different types of streams—readable, writeable, duplex, and transform—and shows how to minimize backpressure, or buildup, in data transmission. In the final section, Alex shows how to combine the techniques and build an HTTP server for streaming video over the web. Learn how to ensure the stream is cross-browser compatible and collect multipart/form-data, such as text data and files, from the upload stream. By the end of the course, you\'ll have a powerful new toolset for building advanced, enterprise-scale applications with Node.js.',
        'starRating': 3.5
      }
    ];
    return { projects };
  }
}
