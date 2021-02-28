import { lazy } from "react";
const About = lazy(() => import("../views/About"));
const CreateUser = lazy(() => import("../views/CreateUser"));
const NotesList = lazy(() => import("../views/NotesList"));
const CreateNote = lazy(() => import("../views/CreateNote"));

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
