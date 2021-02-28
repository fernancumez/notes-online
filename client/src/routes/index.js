import { lazy } from "react";
const About = lazy(() => import("../components/About"));
const CreateUser = lazy(() => import("../components/CreateUser"));
const NotesList = lazy(() => import("../components/NotesList"));
const CreateNote = lazy(() => import("../components/CreateNote"));

export const routes = [
  {
    path: "/",
    exact: true,
    component: NotesList,
  },
  {
    path: "/user",
    exact: true,
    component: CreateUser,
  },
  {
    path: "/create",
    exact: true,
    component: CreateNote,
  },
  {
    path: "/edit/:id",
    exact: true,
    component: CreateNote,
  },
  {
    path: "/about",
    exact: true,
    component: About,
  },
];
