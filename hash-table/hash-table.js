// Use these to store the key/value pairs in your hash table
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashTable { // get O(1), set O(1), delete O(1)

    constructor(numBuckets = 2) {
        // Initialize your buckets here
        this.count = 0;
        this.capacity = numBuckets;
        this.data = new Array(numBuckets).fill(null);
    }

    hash(key) {
        let hashValue = 0;

        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i);
        }

        return hashValue;
    }

    hashMod(key) {
        // Get index after hashing
        const bucketIndex = this.hash(key) % this.capacity;
        return bucketIndex;
    }

    read(key) {
        const bucketIndex = this.hashMod(key);
        if (!this.data[bucketIndex]) {
            return undefined;
        }

        let currPair = this.data[bucketIndex];
        while(currPair.key !== key && currPair.next) {
            currPair = currPair.next;
        }

        if (currPair.key === key) {
            return currPair.value;
        } else {
            return undefined;
        }
    }

    insert(key, value) {
        const bucketIndex = this.hashMod(key);
        const keyValuePair = new KeyValuePair(key, value);
        if(this.data[bucketIndex]) {
            keyValuePair.next = this.data[bucketIndex];
        }
        this.data[bucketIndex] = keyValuePair;
        this.count += 1;
    }


    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // data retention
    resize() {
        const newData = new Array(2*this.capacity).fill(null);
        for (let i = 0; i < this.capacity; i ++) {
            if (this.data[i].next) {
                newData[i] = this.data[i];
                newData[i + this.capacity] = this.data[i].next;
                newData[i].next = null;
            } else {
                // for node without collision
                newData[i + this.capacity] = this.data[i];
            }
        }

        this.capacity *= 2;
        this.data = newData;
    }


    delete(key) {
        const bucketIndex = this.hashMod(key);
        if(!this.data[bucketIndex]) {
            return undefined; 
        }
        
        if (!this.data[bucketIndex].next) {
            if (this.data[bucketIndex].key === key) {
                this.data[bucketIndex] = null;
                this.count -= 1;
            } else {
                return undefined;
            }
        } else {
            // at least two nodes for this index
            let prevPair = this.data[bucketIndex];
            let currPair = this.data[bucketIndex].next;
            while(currPair.key !== key && currPair.next) {
                currPair = currPair.next;
                prevPair = prevPair.next;
            }
    
            if (currPair.key === key) {
                prevPair.next = null;
                this.count -= 1;
            } else {
                return undefined;
            }
        }
    }

}


module.exports = HashTable;

// let hashTable = new HashTable(2);
// let value;
// hashTable.insert("key1", "value1");
// value = hashTable.read('key1');
// hashTable.insert("key2", "value2");
// value = hashTable.read('key2')
// hashTable.insert("key3", "value3");
// value = hashTable.read('key3')

// hashTable.resize();
// console.log(hashTable.data);

// value = hashTable.read('key1')
// console.log(value);
// value = hashTable.read('key2')
// console.log(value)
// value = hashTable.read('key3')
// console.log(value)
