const PN =
  "696-2022-asdads-asd-asda-ds-as-ADASDADADSASDda-sd12312312312313$%%!%@#!$@#ASDPUTZNER-A-6990";

const destructurePN = (partNumberToParse: string) => {
  const secondToLastDelimiter = partNumberToParse.lastIndexOf(
    "-",
    partNumberToParse.lastIndexOf("-") - 1
  ); //takes last two items from string, AKA -P-1234
  const projectPrefix = partNumberToParse.slice(0, secondToLastDelimiter);
  const identifier = PN.slice(secondToLastDelimiter, PN.length);

  const [, componentType, fourDigitPN] = identifier.split("-");
  const sequentialAssyNumber = parseInt(fourDigitPN.substring(0, 2));
  const sequentialPartNumber = parseInt(fourDigitPN.substring(2, 4));

  if (componentType == "A" && sequentialAssyNumber > 0)
    throw new Error(
      "assembly component cannot have sequential part number greater than 0"
    );

  return {
    projectPrefix,
    sequentialAssyNumber,
    sequentialPartNumber,
    componentType,
  };
};

destructurePN(PN);
