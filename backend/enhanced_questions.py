#!/usr/bin/env python3
"""
Enhanced question library with 100 questions covering multiple technologies,
programming languages, and real-world scenarios.
"""

ENHANCED_QUESTIONS = [
    # Java Questions
    {
        "title": "Java Memory Leak in Collection",
        "description": "Fix memory leak caused by improper collection usage in Java application.",
        "buggy_snippet": """public class UserManager {
    private static final Map<String, User> userCache = new HashMap<>();
    
    public void addUser(String id, User user) {
        userCache.put(id, user);
    }
    
    public void removeUser(String id) {
        userCache.remove(id);
    }
}""",
        "what_wrong": "Static Map never gets cleared, causing memory leak as users are added but not properly removed.",
        "fix_outline": "Use WeakHashMap, implement cleanup mechanism, or use cache with TTL.",
        "solution": "Use WeakHashMap or implement proper cache eviction policy with TTL.",
        "difficulty_level": "Medium",
        "category": "Memory Management",
        "estimated_duration": 25,
        "programming_language": "Java",
        "tags": ["java", "memory-leak", "collections", "caching"],
        "rubric": {
            "identify_memory_leak": 3,
            "propose_solution": 4,
            "implement_cleanup": 3
        }
    },
    {
        "title": "Java Thread Safety Issue",
        "description": "Fix thread safety problem in shared counter implementation.",
        "buggy_snippet": """public class Counter {
    private int count = 0;
    
    public void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
}""",
        "what_wrong": "Non-atomic increment operation in multi-threaded environment.",
        "fix_outline": "Use AtomicInteger, synchronized methods, or volatile with proper synchronization.",
        "solution": "Use AtomicInteger: private AtomicInteger count = new AtomicInteger(0);",
        "difficulty_level": "Medium",
        "category": "Concurrency",
        "estimated_duration": 20,
        "programming_language": "Java",
        "tags": ["java", "thread-safety", "concurrency", "atomic"],
        "rubric": {
            "identify_race_condition": 3,
            "propose_thread_safe_solution": 4,
            "explain_atomic_operations": 3
        }
    },
    
    # Python Questions
    {
        "title": "Python Mutable Default Arguments",
        "description": "Fix the mutable default argument trap in Python function.",
        "buggy_snippet": """def add_item(item, items=[]):
    items.append(item)
    return items

result1 = add_item("apple")
result2 = add_item("banana")
print(result1)  # ['apple', 'banana']""",
        "what_wrong": "Mutable default arguments are created once at function definition, not each call.",
        "fix_outline": "Use None as default and create new list inside function, or use immutable defaults.",
        "solution": "def add_item(item, items=None): items = items or []; items.append(item); return items",
        "difficulty_level": "Easy",
        "category": "Python Gotchas",
        "estimated_duration": 15,
        "programming_language": "Python",
        "tags": ["python", "mutable-defaults", "function-arguments"],
        "rubric": {
            "identify_mutable_default": 3,
            "explain_why_it_happens": 2,
            "provide_solution": 3
        }
    },
    
    # JavaScript Questions
    {
        "title": "JavaScript Closure Variable Capture",
        "description": "Fix variable capture issue in JavaScript loop with closures.",
        "buggy_snippet": """for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Output: 3, 3, 3""",
        "what_wrong": "Closure captures reference to variable i, not its value at creation time.",
        "fix_outline": "Use let instead of var, create new scope with IIFE, or use bind.",
        "solution": "for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 1000); }",
        "difficulty_level": "Medium",
        "category": "JavaScript Closures",
        "estimated_duration": 20,
        "programming_language": "JavaScript",
        "tags": ["javascript", "closures", "loops", "settimeout"],
        "rubric": {
            "identify_closure_issue": 3,
            "explain_variable_capture": 3,
            "provide_es6_solution": 4
        }
    },
    
    # Big Data Questions
    {
        "title": "Spark Memory Overflow",
        "description": "Fix memory overflow in Spark job processing large datasets.",
        "buggy_snippet": """val data = spark.read.csv("large_file.csv")
val result = data.collect().map(row => processRow(row))
result.foreach(println)""",
        "what_wrong": "collect() brings all data to driver node, causing memory overflow.",
        "fix_outline": "Use transformations instead of actions, partition data, or use broadcast variables.",
        "solution": "data.map(row => processRow(row)).foreach(println) - keep data distributed.",
        "difficulty_level": "Hard",
        "category": "Big Data",
        "estimated_duration": 30,
        "programming_language": "Scala",
        "tags": ["spark", "big-data", "memory-management", "distributed-computing"],
        "rubric": {
            "identify_memory_issue": 3,
            "explain_distributed_processing": 4,
            "propose_optimization": 3
        }
    },
    
    # Database Questions
    {
        "title": "Database Connection Pool Exhaustion",
        "description": "Fix connection pool exhaustion in database application.",
        "buggy_snippet": """try {
    Connection conn = dataSource.getConnection();
    // ... use connection
} catch (SQLException e) {
    // handle exception
}""",
        "what_wrong": "Connection never closed, leading to pool exhaustion.",
        "fix_outline": "Use try-with-resources or ensure connection is closed in finally block.",
        "solution": "try (Connection conn = dataSource.getConnection()) { /* use connection */ }",
        "difficulty_level": "Medium",
        "category": "Database",
        "estimated_duration": 20,
        "programming_language": "Java",
        "tags": ["database", "connection-pool", "resource-management"],
        "rubric": {
            "identify_resource_leak": 3,
            "propose_proper_cleanup": 4,
            "implement_try_with_resources": 3
        }
    }
]

# Add more questions here - this is just a sample of the 100 questions
# The full file will contain comprehensive questions for:
# - Java, Python, JavaScript, C++, C#, Go, Rust
# - Big Data (Spark, Hadoop, Kafka)
# - Cloud (AWS, Azure, GCP)
# - DevOps (Docker, Kubernetes, CI/CD)
# - Security (Authentication, Authorization, Encryption)
# - Performance (Caching, Optimization, Monitoring)
