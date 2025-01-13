import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

type OptionProps = {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<string>>;
};

const StaggeredDropDown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Filter your results");

  return (
    <div className="p-8 pb-56 flex items-center justify-center">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">{selected}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col bg-indigo gap-2 p-2 rounded-lg shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option
            setOpen={setOpen}
            setSelected={setSelected}
            Icon={FiEdit}
            text="Edit"
          />
          <Option
            setOpen={setOpen}
            setSelected={setSelected}
            Icon={FiPlusSquare}
            text="Duplicate"
          />
          <Option
            setOpen={setOpen}
            setSelected={setSelected}
            Icon={FiShare}
            text="Share"
          />
          <Option
            setOpen={setOpen}
            setSelected={setSelected}
            Icon={FiTrash}
            text="Remove"
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen, setSelected }: OptionProps) => {
  const handleClick = () => {
    setSelected(text); // Set the selected option
    setOpen(false); // Close the dropdown
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md bg-white hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer shadow"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
