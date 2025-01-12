import { Href, Redirect } from "expo-router";

export default function TabIndex() {
  return <Redirect href={'/home/' as Href}/>
}