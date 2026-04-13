// import { useState } from "react";

// type Props = {
//   tags: string[];
//   setTags: (tags: string[]) => void;
// };

// const TagInput = ({ tags, setTags }: Props) => {
//   const [input, setInput] = useState("");

//   const addTag = (value: string) => {
//     const tag = value.trim().toLowerCase();
//     if (!tag || tags.includes(tag)) return;

//     setTags([...tags, tag]);
//     setInput("");
//   };

//   const removeTag = (tag: string) => {
//     setTags(tags.filter(t => t !== tag));
//   };

//   return (
//     <div className="border p-2 rounded flex flex-wrap gap-2">
      
//       {/* Existing tags */}
//       {tags.map(tag => (
//         <span
//           key={tag}
//           className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
//         >
//           {tag}
//           <button onClick={() => removeTag(tag)}>✕</button>
//         </span>
//       ))}

//       {/* Input */}
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault();
//             addTag(input);
//           }
//         }}
//         placeholder="Add tag..."
//         className="outline-none flex-1"
//       />
//     </div>
//   );
// };

// export default TagInput;