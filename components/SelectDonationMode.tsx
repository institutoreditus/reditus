import ContributionButton from "./checkout_buttons/ContributionButton";
import { SubscriptionButton } from "./checkout_buttons/SubscriptionButton";

const SelectDonationMode = (props: any) => {
  return (
    <div>
      <p className="title">
        Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
        retribuição.
      </p>

      <ContributionButton step={1} {...props} />
      <SubscriptionButton step={1} {...props} />
    </div>
  );
};

export default SelectDonationMode;
