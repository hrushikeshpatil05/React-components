
// console.log('Im here');

let arr = [1,[2,3],[[3,[4,5]]]];
// let newArr = arr.flat(3);
// console.log(arr);


Array.prototype.myFlat = function(depth) {
    let result = [];
    for(let i=0;i<this.length;i++) {
        // console.log(this[i]);
        if(Array.isArray(this[i]) && depth > 0) {
            let flatArr = this[i].myFlat(depth - 1);
            result.push(...flatArr);
        }
        else {
            result.push(this[i]);
        }
     }
    return result;
}

Array.prototype.myIterativeFlat = function() {
    let st = [...this];
    let result = [];
    while(st.length) {
        let top = st.pop();
        // console.log('top',top);
        if(Array.isArray(top)) {
            // console.log('inside is array', ...top);
            st.push(...top);
        }
        else {
            result.push(top);
        }
    }
    return result.reverse();
}

let myNewArr = arr.myIterativeFlat();
// console.log(myNewArr);


const swapKeyValue = (obj) => {
    let res = {};
    for(let i in obj) {
        let value = obj[i];
        if(!res[value]) {
            res[value] = [i];
        }
        else {
            res[value].push(i);
        }
    }
    return res;
}

const original = {
  a: "apple",
  b: "banana",
  c: "apple",
  d: "cherry",
  e: "banana"
};

let swappedArr =swapKeyValue(original);
// console.log('swappedArr',swappedArr);

const validCart = (cart) => true;

const orderId = (orderId) => true;

const createOrder = function(obj) {
    let counter = 1;
    const pr = new Promise((resolve,reject) => {
        if(!validCart(obj)) {
            const err = new Error("Cart is not valid");
            reject(err);
        }
        const orderId = counter++;
        if(orderId) {
            resolve(orderId);
        }
    });
    return pr;
}

const placeOrder = (res) => {
    return res*10;
}

// createOrder(original)
//     .then((res) => placeOrder(res))
//     .then((res) => console.log(res));


class MyPromise {
  constructor(executor) {
    // console.log('here');
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (res) => {
        // console.log('in resolve');
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = res;
        // Execute the stored functions
        this.resolvedCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (err) => {
        // console.log('in reject');
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = err;
        // Execute the stored functions
        this.rejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
        // console.log('in try');
      executor(resolve, reject);
    } catch (err) {
        // console.log('in catch');
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.state === "rejected") {
      onRejected(this.reason);
    } else if (this.state === "pending") {
      this.resolvedCallbacks.push(() => onFulfilled(this.value));
      this.rejectedCallbacks.push(() => onRejected(this.reason));
    }
    return this; 
  }
}

// const myAsyncOrder = new MyPromise((resolve, reject) => {
//     console.log("1. Order placed, starting timer...");

//     setTimeout(() => {
//         const success = true;
//         if (success) {
//             resolve("Delicious Pizza 🍕");
//         } else {
//             reject("Kitchen is closed ❌");
//         }
//     }, 2000); // 2 second delay
// });

// // Invoking the handler
// myAsyncOrder.then(
//     (data) => console.log("3. Success:", data), // Runs if resolved
//     (err) => console.log("3. Error:", err)      // Runs if rejected
// );

// console.log("2. This logs while the pizza is cooking!");

// 1. Define the static resolve method
MyPromise.resolve = function(value) {
    return new MyPromise((resolve) => resolve(value));
};

// MyPromise.reject = function(err) {
//     return new MyPromise((reject) => reject(err));
// }

// 2. Corrected Test Promises
// Add this to your MyPromise class
MyPromise.reject = function(reason) {
    return new MyPromise((_, reject) => reject(reason));
};

MyPromise.myAll = (promises) => {
    return new MyPromise((resolve, reject) => {
        let results = [];
        let count = 0;
        if (promises.length === 0) return resolve([]);

        promises.forEach((pr, idx) => {
            // Use static resolve to handle non-promise values
            MyPromise.resolve(pr).then(
                (val) => {
                    results[idx] = val;
                    count++;
                    if (count === promises.length) resolve(results);
                },
                (err) => {
                    // FAIL FAST: This triggers the main reject immediately
                    reject(err); 
                }
            );
        });
    });
};

// --- TEST CASE ---

// P1 will succeed in 3 seconds
const p1 = new MyPromise((resolve) => setTimeout(() => resolve("P1 Success"), 3000));

// P2 will FAIL in 1 second
const p2 = new MyPromise((resolve, reject) => setTimeout(() => reject("P2 Failed!"), 1000));

// P3 will succeed in 2 seconds
const p3 = new MyPromise((resolve) => setTimeout(() => resolve("P3 Success"), 2000));

// console.log("Starting MyAll...");

// MyPromise.myAll([p1, p2, p3])
//     .then((res) => {
//         console.log("This will NOT print because P2 fails:", res);
//     })
//     .catch((err) => {
//         console.error("Caught Error:", err); 
//     });

function curry(fn) {
  return function curried(...args) {
    // fn.length tells us how many arguments the original function expects
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // Return a new function that waits for the rest of the arguments
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      }
    }
  };
}

// Example usage:
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(3)); // 6
// console.log(curriedSum(1, 2)(3)); // 6


let count = 0;

let incrementCounter = () => {
  count++
  // console.log(`Count: ${count}`);
}

// let intervalId = setInterval(incrementCounter,1000);


const mySetInterval = ((fn,delay) => {
  let timerId;
  // console.log(delay);

  const wrapper = () => {
    fn();
    timerId = setTimeout(wrapper,delay);
  }

  timerId = setTimeout(wrapper,delay);

  return () => {
    clearTimeout(timerId);
  }
});

// const stop = mySetInterval(() => {
//   incrementCounter()
// }, 1000);

// setTimeout(() => {
//   stop();
// }, 5000);


Array.isMyArray = (args) => {
  console.log(args);
  return Object.prototype.toString.call(args) === '[object Array]';
}

let myArr = [5,10,25];
let myObj = {'a': 1,'b': 2,'c': 3};

// console.log(Array.isMyArray(myArr));

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if(cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this,args);
    cache.set(key,result);
    return result;
  }
}

function fibonacci(n) { // Exponential time complexity O(2^n)
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}


// The memoize function wraps the original, expensive function
const memoizedFibonacci = memoize(fibonacci); 

// The first call computes and caches all intermediate results
// console.log(memoizedFibonacci(42)); // Takes time

// console.log(memoizedFibonacci(42)); // Instant retrieval from cache

let ct = 0;

// const pr1 = new Promise((resolve,reject) => {
//   console.log('inside promise pr1',ct);
//   setTimeout(() => {
//     resolve("Resolved the promise");
//   },5000);
// });

// const pr2 = new Promise((resolve,reject) => {
//   console.log('inside promise pr2',ct);
//   setTimeout(() => {
//     resolve("Resolved the promise");
//   },10000);
// });

// async function promiseHandler() {
//   console.log('inside handler');
//   setInterval(() => {ct++;
//     console.log(ct);
//   },1000);
//   const obj1 = await pr1;
//   // console.log('obj1',obj1);
//   const obj2 = await pr2;
//   console.log('obj2',obj2);
// }

// promiseHandler();

// var a = 10;
// function temp() {
//   a_1 = 20;
//   console.log(a_1);
//   var a_1 = 30;
//   a_2 = 40;
//   console.log(a);
// }

// temp();
// console.log(a_2);
// console.log(a_1);
// var a = 30;

// let badArray = [];

// function createCloserArray(n) {
//   return function() {
//     return "n = " + n;
//   }
// }

// for(let i=0;i<10;i++) {
//   badArray[i] = createCloserArray(i);
// }

// for(var i in badArray) {
//   console.log(badArray[i]());
// }


var fullName = "Hrushikesh Patil";

var obj = {
  fullName : "Unmesh Kadam",
  prop: {
    fullName : "Akshad Naikwadi",
    getFullName: function() {
      return this.fullName;
    }
  },
  getFirstName: function() {
    return this.fullName.split(' ')[0];
  },
  getLastName: (function() {
    return this.fullName.split(' ')[1];
  }),
}
// console.log(obj.fullName);
// console.log(obj.prop.getFullName());
// console.log(obj.getFirstName());
// console.log(obj.getLastName.bind(obj)());

console.log(Math.max(...myArr));







 