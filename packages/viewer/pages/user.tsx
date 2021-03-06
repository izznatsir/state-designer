import useSWR from "swr"
import * as React from "react"
import { useUser } from "../auth/useUser"
import User from "../site/user"
import { UserProjectsResponse } from "../utils/firebase"

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json())

const Index = () => {
  const { user } = useUser()

  const { data } = useSWR<UserProjectsResponse>(
    [`/api/${user?.id}?uid=${user?.id}`, user?.token],
    fetcher
  )

  return <User data={data} />
}

export default Index
