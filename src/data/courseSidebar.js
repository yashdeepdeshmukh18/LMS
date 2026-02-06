const courseSchemaData = [
    {
        section_id: "ch1",
        title: "Real Numbers",
        order_index: 1,

        lessons: [
            // 1️⃣ VIDEO
            {
                id: "l1-v",
                section_id: "ch1",
                title: "Euclid's Lemma",
                content_type: "video",
                video_url: "/test.mp4",
                order_index: 1,

                article_content: {
                    transcripts: {
                        en: "In this lesson, we learn the basic idea behind Euclid's Lemma.",
                        hi: "इस पाठ में हम यूक्लिड के प्रमेय की मूल अवधारणा सीखते हैं।"
                    }
                }
            },

            // 2️⃣ TEXTBOOK
            {
                id: "l1-t",
                section_id: "ch1",
                title: "Euclid's Lemma",
                content_type: "article",
                order_index: 2,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "Introduction",
                                content: "Euclid's Lemma is an important statement used in Number Theory..."
                            },
                            {
                                heading: "Lemma Statement",
                                content: "If a prime number p divides the product of two integers a and b..."
                            },
                            {
                                heading: "Understanding the Lemma",
                                content: "This lemma forms the basis of the Fundamental Theorem of Arithmetic."
                            }
                        ],
                        resources: [
                            {
                                label: "Download Notes (PDF)",
                                url: "/assets/notes/real-numbers.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/real-numbers.pdf"
                            }
                        ]
                    }
                }
            },

            // 3️⃣ ASSIGNMENT (TEST)
            {
                id: "l1-a",
                section_id: "ch1",
                title: "Euclid's Lemma",
                content_type: "test",
                order_index: 3,

                quiz_data: {
                    points: 20,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "Find HCF of 36 and 60 using Euclid’s Algorithm."
                        },
                        {
                            question:
                                "Show that √3 is irrational."
                        }
                    ]
                }
            },

            // FUNDAMENTAL THEOREM OF ARITHMETIC 
            {
                id: "l2-v",
                section_id: "ch1",
                title: "Fundamental Theorem of Arithmetic",
                content_type: "video",
                video_url: "/videos/fta.mp4",
                order_index: 4,

                article_content: {
                    transcripts: {
                        en:
                            "Every integer greater than 1 can be expressed as a product of primes.",
                        hi:
                            "1 से बड़ी प्रत्येक पूर्ण संख्या अभाज्य संख्याओं के गुणनफल के रूप में लिखी जा सकती है।"
                    }
                }
            },

            {
                id: "l2-t",
                section_id: "ch1",
                title: "Fundamental Theorem of Arithmetic",
                content_type: "article",
                order_index: 4,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "Statement",
                                content:
                                    "Every integer greater than 1 can be expressed as a product of primes in a unique way."
                            },
                            {
                                heading: "Example",
                                content:
                                    "The number 60 can be expressed as 2 × 2 × 3 × 5."
                            }
                        ],
                        resources: [
                            {
                                label: "Download Notes (PDF)",
                                url: "/assets/notes/fta.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/fta.pdf"
                            }
                        ]
                    }
                }
            },

            {
                id: "l2-a",
                section_id: "ch1",
                title: "Fundamental Theorem of Arithmetic",
                content_type: "test",
                order_index: 4,

                quiz_data: {
                    points: 15,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "Prove that there are infinitely many prime numbers."
                        },
                        {
                            question:
                                "Find the prime factorization of 84."
                        }
                    ]
                }
            },

            // HCF & LCM 
            {
                id: "l3-v",
                section_id: "ch1",
                title: "HCF and LCM",
                content_type: "video",
                video_url: "/videos/hcf-lcm.mp4",
                order_index: 5,

                article_content: {
                    transcripts: {
                        en:
                            "This lesson explains Highest Common Factor and Least Common Multiple.",
                        hi:
                            "इस पाठ में महत्तम समापवर्तक और लघुत्तम समापवर्त्य समझाया गया है।"
                    }
                }
            },
            {
                id: "l3-t",
                section_id: "ch1",
                title: "HCF and LCM",
                content_type: "article",
                order_index: 5,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "HCF",
                                content:
                                    "The Highest Common Factor (HCF) of two numbers is the largest number that divides both."
                            },
                            {
                                heading: "LCM",
                                content:
                                    "The Least Common Multiple (LCM) of two numbers is the smallest number that is a multiple of both."
                            }
                        ],
                        resources: [
                            {
                                label: "Practice Problems (PDF)",
                                url: "/assets/practice/hcf-lcm.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/hcf-lcm.pdf"
                            }
                        ]
                    }
                }
            },

            {
                id: "l3-a",
                section_id: "ch1",
                title: "HCF and LCM",
                content_type: "test",
                order_index: 5,

                quiz_data: {
                    points: 15,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "Find the HCF of 12 and 18."
                        },
                        {
                            question:
                                "Find the LCM of 12 and 18."
                        }
                    ]
                }
            }
        ]
    },

    {
        section_id: "ch2",
        title: "Polynomials",
        order_index: 2,

        lessons: [
            {
                id: "l4-v",
                section_id: "ch2",
                title: "Introduction to Polynomials",
                content_type: "video",
                video_url: "/videos/polynomials-intro.mp4",
                order_index: 1,

                article_content: {
                    transcripts: {
                        en:
                            "In this lesson, we introduce polynomials and algebraic expressions.",
                        hi:
                            "इस पाठ में हम बहुपद और बीजीय व्यंजकों की अवधारणा समझते हैं।"
                    }
                }
            },
            {
                id: "l4-t",
                section_id: "ch2",
                title: "Introduction to Polynomials",
                content_type: "article",
                order_index: 1,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "Definition",
                                content:
                                    "A polynomial is an expression consisting of variables and coefficients."
                            },
                            {
                                heading: "Examples",
                                content:
                                    "Examples of polynomials include 2x + 3, x^2 - 4x + 5."
                            }
                        ],
                        resources: [
                            {
                                label: "Download Notes (PDF)",
                                url: "/assets/notes/polynomials-intro.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/polynomials-intro.pdf"
                            }
                        ]
                    }
                }
            },

            {
                id: "l4-a",
                section_id: "ch2",
                title: "Introduction to Polynomials",
                content_type: "test",
                order_index: 1,

                quiz_data: {
                    points: 10,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "Identify whether 3x^2 + 2x + 1 is a polynomial."
                        },
                        {
                            question:
                                "Write an example of a polynomial of degree 2."
                        }
                    ]
                }
            },

            {
                id: "l5-v",
                section_id: "ch2",
                title: "Degree of a Polynomial",
                content_type: "video",
                video_url: "/videos/polynomials-degree.mp4",
                order_index: 2,

                article_content: {
                    transcripts: {
                        en:
                            "This lesson explains the degree of a polynomial with examples.",
                        hi:
                            "इस पाठ में उदाहरणों के साथ बहुपद की घात समझाई गई है।"
                    }
                }
            },

            {
                id: "l5-t",
                section_id: "ch2",
                title: "Degree of a Polynomial",
                content_type: "article",
                order_index: 2,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "Definition",
                                content:
                                    "The degree of a polynomial is the highest power of the variable in the expression."
                            },
                            {
                                heading: "Example",
                                content:
                                    "In the polynomial 4x^3 + 2x^2 + x, the degree is 3."
                            }
                        ],
                        resources: [
                            {
                                label: "Practice Problems (PDF)",
                                url: "/assets/practice/polynomials-degree.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/polynomials-degree.pdf"
                            }
                        ]
                    }
                }
            },

            {
                id: "l5-a",
                section_id: "ch2",
                title: "Degree of a Polynomial",
                content_type: "test",
                order_index: 2,

                quiz_data: {
                    points: 10,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "What is the degree of the polynomial 5x^4 + 3x^2 + 1?"
                        },
                        {
                            question:
                                "Find the degree of the polynomial x^3 - 2x + 7."
                        }
                    ]
                }
            },

            {
                id: "l6-v",
                section_id: "ch2",
                title: "Zeros of a Polynomial",
                content_type: "video",
                video_url: "/videos/polynomials-zeros.mp4",
                order_index: 3,

                article_content: {
                    transcripts: {
                        en:
                            "In this lesson, we learn how to find the zeros of a polynomial.",
                        hi:
                            "इस पाठ में हम बहुपद के शून्य ज्ञात करना सीखते हैं।"
                    }
                }
            },
            {
                id: "l6-t",
                section_id: "ch2",
                title: "Zeros of a Polynomial",
                content_type: "article",
                order_index: 3,

                article_content: {
                    textbook: {
                        sections: [
                            {
                                heading: "Definition",
                                content:
                                    "The zeros of a polynomial are the values of the variable that make the polynomial equal to zero."
                            },
                            {
                                heading: "Example",
                                content:
                                    "For the polynomial x^2 - 5x + 6, the zeros are x = 2 and x = 3."
                            }
                        ],
                        resources: [
                            {
                                label: "Practice Problems (PDF)",
                                url: "/assets/practice/polynomials-zeros.pdf"
                            },
                            {
                                label: "Assignments (PDF)",
                                url: "/assets/assignments/polynomials-zeros.pdf"
                            }
                        ]
                    }
                }
            },
            
            {
                id: "l6-a",
                section_id: "ch2",
                title: "Zeros of a Polynomial",
                content_type: "test",
                order_index: 3,

                quiz_data: {
                    points: 10,
                    attempts: 2,
                    questions: [
                        {
                            question:
                                "Find the zeros of the polynomial x^2 - 3x + 2."
                        },
                        {
                            question:
                                "Determine the zeros of the polynomial x^2 + 4x + 4."
                        }
                    ]
                }
            }
        ]
    }
];

export default courseSchemaData;
