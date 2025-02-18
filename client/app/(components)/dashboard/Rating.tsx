import { Star } from "lucide-react";
import React from "react";

const Rating = ({ rating }: any) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((rate) => (
        <Star
          key={rate}
          color={rating >= rate ? "yellow" : "gray"}
          className="hover:scale-90 transition-all size-3"
        />
      ))}
    </div>
  );
};

export default Rating;
