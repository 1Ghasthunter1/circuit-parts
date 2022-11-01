import { FC, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldProps, FormikHelpers } from "formik";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

const people: { id: number; name: string }[] = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "ASD Alexander" },
  { id: 3, name: "Leslie dsa" },
  // More users...
];

const ECombobox = ({
  label,
  placeholder,
  field: { value, onChange, name, onBlur },
  form: { setFieldValue },
  randomProp,
}: {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  field: FieldProps["field"];
  form: FormikHelpers<FieldProps>;
  randomProp: string;
}) => {
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  console.log(randomProp);
  return (
    <>
      <Combobox
        as="div"
        name="vendor"
        value={value}
        onChange={(val) => setFieldValue("vendor", val.name)}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(value) => setQuery(value.target.value)}
            value={query}
            name="vendor"
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute text-gray-400 inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            {({ open }) => (
              <div
                className={classNames(
                  "transition duration-100",
                  open ? "" : "rotate-180"
                )}
              >
                <FontAwesomeIcon icon="chevron-down" size="sm" />
              </div>
            )}
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {true && (
              <Combobox.Option
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
                value={{ id: null, name: query }}
              >
                Create "{query}"
              </Combobox.Option>
            )}
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <FontAwesomeIcon icon="check" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </>
  );
};
export default ECombobox;
