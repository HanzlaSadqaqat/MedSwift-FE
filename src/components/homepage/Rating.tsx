// import React, { useState } from "react";

// type RatingProps = {
//   maxRating: number;
// };

// const Rating: React.FC<RatingProps> = ({ maxRating }) => {
//   const [rating, setRating] = useState(0);

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//   };

//   return (
//     <div className="flex items-center">
//       {[...Array(maxRating)].map((_, index) => {
//         const ratingValue = index + 1;
//         return (
//           <label
//             key={ratingValue}
//             className={`text-yellow-400 cursor-pointer ${
//               ratingValue <= rating ? "text-yellow-600" : ""
//             }`}
//             onClick={() => handleRatingChange(ratingValue)}
//           >
//             &#9733;
//           </label>
//         );
//       })}
//     </div>
//   );
// };

// export default Rating;
