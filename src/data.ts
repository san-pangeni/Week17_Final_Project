export interface Flashcard {
  id: number;
  category: string;
  term: string;
  definition: string;
  example: string;
}

export const flashcardData: Flashcard[] = [
  {
    id: 1,
    category: "Functions",
    term: "Function",
    definition: "A relation between a set of inputs and a set of permissible outputs where each input is related to exactly one output.",
    example: "f(x) = 2x + 3 is a function that maps each input x to exactly one output."
  },
  {
    id: 2,
    category: "Functions",
    term: "Domain",
    definition: "The set of all possible input values for which a function is defined.",
    example: "For f(x) = 1/x, the domain is all real numbers except 0, since division by zero is undefined."
  },
  {
    id: 3,
    category: "Functions",
    term: "Range",
    definition: "The set of all possible output values that a function can produce.",
    example: "For f(x) = x², the range is [0, ∞) since squares are never negative."
  },
  {
    id: 4,
    category: "Functions",
    term: "One-to-One Function",
    definition: "A function in which each element in the range corresponds to exactly one element in the domain. Every y-value is mapped to by at most one x-value.",
    example: "f(x) = 2x + 3 is one-to-one because each y-value comes from exactly one x-value."
  },
  {
    id: 5,
    category: "Functions",
    term: "Inverse Function",
    definition: "A function that reverses another function: if f(x) = y, then f⁻¹(y) = x. Only one-to-one functions have inverses that are also functions.",
    example: "If f(x) = 2x + 3, then f⁻¹(x) = (x - 3)/2"
  },
  {
    id: 6,
    category: "Polynomials",
    term: "Polynomial",
    definition: "An expression consisting of variables and coefficients, involving only addition, subtraction, multiplication, and non-negative integer exponents of variables.",
    example: "P(x) = 3x⁴ + 2x² - 5x + 7"
  },
  {
    id: 7,
    category: "Polynomials",
    term: "Quadratic Formula",
    definition: "A formula to find the roots of a quadratic equation ax² + bx + c = 0, given by x = (-b ± √(b² - 4ac)) / 2a",
    example: "For 2x² - 4x - 6 = 0, a=2, b=-4, c=-6, so x = (4 ± √(16 + 48)) / 4 = (4 ± √64) / 4 = (4 ± 8) / 4 = 3 or -1"
  },
  {
    id: 8,
    category: "Polynomials",
    term: "Factoring",
    definition: "The process of finding expressions that can be multiplied together to give the original expression.",
    example: "x² - 4 can be factored as (x - 2)(x + 2)"
  },
  {
    id: 9,
    category: "Polynomials",
    term: "Remainder Theorem",
    definition: "If a polynomial P(x) is divided by (x - a), then the remainder equals P(a).",
    example: "For P(x) = x³ - 2x² + 3x - 4, the remainder when divided by (x - 2) is P(2) = 2³ - 2(2²) + 3(2) - 4 = 8 - 8 + 6 - 4 = 2"
  },
  {
    id: 10,
    category: "Trigonometry",
    term: "Sine",
    definition: "In a right triangle, the sine of an angle is the ratio of the length of the opposite side to the length of the hypotenuse.",
    example: "In a right triangle with angle θ, sin(θ) = opposite/hypotenuse"
  },
  {
    id: 11,
    category: "Trigonometry",
    term: "Cosine",
    definition: "In a right triangle, the cosine of an angle is the ratio of the length of the adjacent side to the length of the hypotenuse.",
    example: "In a right triangle with angle θ, cos(θ) = adjacent/hypotenuse"
  },
  {
    id: 12,
    category: "Trigonometry",
    term: "Tangent",
    definition: "In a right triangle, the tangent of an angle is the ratio of the sine to the cosine of that angle, or the ratio of the opposite side to the adjacent side.",
    example: "tan(θ) = sin(θ)/cos(θ) = opposite/adjacent"
  },
  {
    id: 13,
    category: "Trigonometry",
    term: "Pythagorean Identity",
    definition: "The fundamental trigonometric identity that relates sine and cosine: sin²(θ) + cos²(θ) = 1",
    example: "sin²(30°) + cos²(30°) = (1/2)² + (√3/2)² = 1/4 + 3/4 = 1"
  },
  {
    id: 14,
    category: "Trigonometry",
    term: "Radian",
    definition: "A unit of angle measure defined such that an angle of 1 radian subtends an arc of length equal to the radius of the circle.",
    example: "A full circle is 2π radians, which equals 360 degrees. Therefore, π radians = 180 degrees."
  },
  {
    id: 15,
    category: "Trigonometry",
    term: "Law of Sines",
    definition: "A relationship between the sides and angles of a triangle: a/sin(A) = b/sin(B) = c/sin(C)",
    example: "In a triangle with sides a, b, c and angles A, B, C, if a = 5, b = 7, and A = 30°, then sin(B) = (b × sin(A))/a = (7 × sin(30°))/5 = 7/10"
  },
  {
    id: 16,
    category: "Logarithms",
    term: "Logarithm",
    definition: "The logarithm of a number to a given base is the exponent to which the base must be raised to produce that number.",
    example: "log₂(8) = 3 because 2³ = 8"
  },
  {
    id: 17,
    category: "Logarithms",
    term: "Natural Logarithm",
    definition: "The logarithm to the base e (approximately 2.71828). It is denoted as ln(x).",
    example: "ln(e²) = 2 because e² = e²"
  },
  {
    id: 18,
    category: "Logarithms",
    term: "Logarithm Properties",
    definition: "Key properties include: log(xy) = log(x) + log(y), log(x/y) = log(x) - log(y), and log(xⁿ) = n·log(x)",
    example: "log(50) = log(5 × 10) = log(5) + log(10) ≈ 0.699 + 1 = 1.699"
  },
  {
    id: 19,
    category: "Exponentials",
    term: "Exponential Function",
    definition: "A function of the form f(x) = aˣ, where a is a positive constant.",
    example: "f(x) = 2ˣ is an exponential function with base 2"
  },
  {
    id: 20,
    category: "Exponentials",
    term: "Exponential Growth",
    definition: "A process where a quantity increases at a rate proportional to its current value, described by f(t) = A × eᵏᵗ where k > 0.",
    example: "A population growing at a continuous rate of 5% per year can be modeled as P(t) = P₀ × e^(0.05t), where P₀ is the initial population."
  },
  {
    id: 21,
    category: "Exponentials",
    term: "Exponential Decay",
    definition: "A process where a quantity decreases at a rate proportional to its current value, described by f(t) = A × eᵏᵗ where k < 0.",
    example: "Radioactive decay follows the formula A(t) = A₀ × e^(-λt), where λ is the decay constant."
  },
  {
    id: 22,
    category: "Conic Sections",
    term: "Ellipse",
    definition: "The set of all points in a plane such that the sum of the distances from two fixed points (the foci) is constant.",
    example: "The equation (x²/a²) + (y²/b²) = 1 represents an ellipse centered at the origin."
  },
  {
    id: 23,
    category: "Conic Sections",
    term: "Parabola",
    definition: "The set of all points in a plane that are equidistant from a fixed point (the focus) and a fixed line (the directrix).",
    example: "The equation y = x² represents a parabola with its vertex at the origin and opening upward."
  },
  {
    id: 24,
    category: "Conic Sections",
    term: "Hyperbola",
    definition: "The set of all points in a plane such that the absolute difference of the distances from two fixed points (the foci) is constant.",
    example: "The equation (x²/a²) - (y²/b²) = 1 represents a hyperbola centered at the origin."
  },
  {
    id: 25,
    category: "Sequences",
    term: "Arithmetic Sequence",
    definition: "A sequence of numbers in which the difference between consecutive terms is constant.",
    example: "3, 7, 11, 15, 19, ... is an arithmetic sequence with a common difference of 4."
  },
  {
    id: 26,
    category: "Sequences",
    term: "Geometric Sequence",
    definition: "A sequence of numbers in which each term is a fixed multiple of the preceding term.",
    example: "2, 6, 18, 54, 162, ... is a geometric sequence with a common ratio of 3."
  },
  {
    id: 27,
    category: "Sequences",
    term: "Fibonacci Sequence",
    definition: "A sequence where each number is the sum of the two preceding ones, starting from 0 and 1.",
    example: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ..."
  },
  {
    id: 28,
    category: "Vectors",
    term: "Vector",
    definition: "A quantity with both magnitude and direction, typically represented by an arrow or by components in a coordinate system.",
    example: "The vector v = (3, 4) has magnitude |v| = 5 and points in the direction of angle θ = tan⁻¹(4/3) ≈ 53.1° from the positive x-axis."
  },
  {
    id: 29,
    category: "Vectors",
    term: "Dot Product",
    definition: "A scalar product of two vectors, defined as a·b = |a||b|cos(θ) or a·b = a₁b₁ + a₂b₂ + ... + aₙbₙ",
    example: "For vectors a = (2, 3) and b = (4, -1), the dot product is a·b = 2×4 + 3×(-1) = 8 - 3 = 5"
  },
  {
    id: 30,
    category: "Vectors",
    term: "Cross Product",
    definition: "A vector product of two vectors that results in a vector perpendicular to both input vectors, defined as |a×b| = |a||b|sin(θ)",
    example: "For vectors a = (2, 3, 0) and b = (4, -1, 0), the cross product a×b = (0, 0, 2×(-1) - 3×4) = (0, 0, -14)"
  },
  {
    id: 31,
    category: "Matrices",
    term: "Matrix",
    definition: "A rectangular array of numbers, symbols, or expressions arranged in rows and columns.",
    example: "A = [1 2 3; 4 5 6] is a 2×3 matrix with 2 rows and 3 columns."
  },
  {
    id: 32,
    category: "Matrices",
    term: "Matrix Multiplication",
    definition: "An operation that produces a new matrix by taking dot products of rows from the first matrix with columns from the second.",
    example: "For A = [1 2; 3 4] and B = [5 6; 7 8], A×B = [1×5+2×7 1×6+2×8; 3×5+4×7 3×6+4×8] = [19 22; 43 50]"
  },
  {
    id: 33,
    category: "Matrices",
    term: "Determinant",
    definition: "A scalar value that can be computed from a square matrix and represents the scaling factor of the linear transformation described by the matrix.",
    example: "For A = [a b; c d], the determinant is det(A) = ad - bc"
  },
  {
    id: 34,
    category: "Limits",
    term: "Limit",
    definition: "The value that a function approaches as the input approaches a particular value.",
    example: "lim(x→0) sin(x)/x = 1"
  },
  {
    id: 35,
    category: "Limits",
    term: "Continuity",
    definition: "A function is continuous at a point if the limit of the function as x approaches that point equals the function value at that point.",
    example: "f(x) = x² is continuous for all real numbers because lim(x→a) x² = a² for any value of a."
  },
  {
    id: 36,
    category: "Limits",
    term: "L'Hôpital's Rule",
    definition: "A method for evaluating limits of indeterminate forms like 0/0 or ∞/∞ by taking the derivatives of numerator and denominator.",
    example: "For lim(x→0) sin(x)/x, apply L'Hôpital's rule to get lim(x→0) cos(x)/1 = 1"
  }
];

export const categories = Array.from(new Set(flashcardData.map(card => card.category)));