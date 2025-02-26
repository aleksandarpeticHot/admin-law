import { User } from "@heroui/react";

export default function Login() {

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <User
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      }}
      description="Product Designer"
      name="Jane Doe"
    />

  </div>
}