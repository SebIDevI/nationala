import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px] mx-auto py-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="frontend">Frontend</TabsTrigger>
        <TabsTrigger value="backend">Backend</TabsTrigger>
      </TabsList>
      <TabsContent value="frontend">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Frontend</CardTitle>
            <CardDescription>
              {/* <span className="my-4">For the frontend, I used:</span> */}
              <ul className="font-gothamBlack">
                <li>Daisyui</li>
                <li>TailwindCSS</li>
                <li>Shadcn/ui</li>
                <li>Lottie for the animation</li>
                <li>Framer-motion</li>
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="backend">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Backend</CardTitle>
            <CardDescription>
              {/* For the backend I used: */}
              <ul className="font-gothamBlack">
                <li>Postgre</li>
                <li>Prisma</li>
                <li>Stripe</li>
                <li>Nodemailer</li>
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
