import { Button } from "@heroui/react";
import { SocialPlatforms } from "@/components/atoms/Icons";
export default function NavBrand() {
  return (
    <div className="max-w-fit flex items-center-safe">
      <Button
        onPress={() => window?.location?.assign("/")}
        className="hidden md:inline-flex gap-0 rounded-full bg-transparent text-foreground"
      >
        <SocialPlatforms.SignAIght className="w-7 h-7 [&>svg]:w-full [&>svg]:h-full" />
        <div className="flex flex-col font-semibold text-sm items-stretch scale-80 leading-tight">
          SignAIght
        </div>
      </Button>
    </div>
  );
}
