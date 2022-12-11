import { Button, Paragraph } from "../components/atoms";

export default function Utils() {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 dark:bg-blue-dark bg-blue">
      <Paragraph>Paragraph</Paragraph>
      <Button>Enregistrer</Button>
    </div>
  );
}
