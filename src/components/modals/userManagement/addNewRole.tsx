import {
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { IModule, IRole, ModifyRole } from "@/models/user.model";

type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewRole({ isOpen, onClose }: NewCategoryModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();
  const [modules, setModules] = useState<IModule[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<number[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [role, setRole] = useState<number>(0);

  const { setApiErrorMessage } = useOnboarding();
  const initialValues = {
    email: "",
    name: "",
    role: "",
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  async function onSubmit(id: number) {
    setLoading(true);
    try {
      const role = roles.find((item) => item.id === id);
      if (role) {
        const data: ModifyRole = {
          roleName: role.roleName,
          roleType: role.roleType,
          description: role.description,
          policies: selectedPolicies,
        };
        const res = await OnboardingServices.modifySingleRole(data, id);

        toast({
          status: "success",
          description: `Role '${role?.roleName.toUpperCase()}' has been successfully configured`,
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  }
  const getAllModules = async () => {
    try {
      const res = await OnboardingServices.getModules();
      setModules(res.data);
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  const getAllRoles = async () => {
    try {
      const res = await OnboardingServices.getAllRoles();
      setRoles(res.data.roles);
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  };

  const handleSelectedPolicies = (id: number) => {
    const selected = [...selectedPolicies];
    if (selected.includes(id)) {
      setSelectedPolicies(selected.filter((item) => item !== id));
    } else {
      setSelectedPolicies([...selected, id]);
    }
  };
  useEffect(() => {
    console.log(selectedPolicies);
  }, [selectedPolicies]);

  useEffect(() => {
    getAllModules();
    getAllRoles();
  }, []);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader className="">
          <div className="flex flex-col ">
            <p className="text-[24px] font-bold">Configure Role</p>
            <p className="text-[14px] text-[#474A57]">
              Select a role and set the permissions for the role on this
              platform. The assigned permissions will apply to all users
              assigned to the role.
            </p>
          </div>
        </DrawerHeader>
        <DrawerCloseButton
          position="absolute"
          top="28px"
          right="30px"
          size="sm"
          _hover={{ bg: "gray.200" }}
          sx={{
            borderRadius: "full",
            border: "2px solid gray",
            borderColor: "gray.700",
          }}
        />
        <DrawerBody className="w-full rounded-lg bg-white">
          <div className=" rounded-xl flex flex-col gap-3 ">
            <div className="flex flex-col gap-1">
              <p className="textsm font-semibold">Select role</p>
              <select
                title="role"
                name="role"
                id="role"
                className="p-2 w-full rounded-lg border outline-none"
                onChange={(e) => setRole(parseInt(e.target.value))}
              >
                <option value="">Select the role to configure</option>
                {roles.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.roleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p className="textsm font-semibold">Assign Permissions</p>
              <Accordion allowToggle>
                <div className="flex flex-col gap-2">
                  {modules.map((mod, index) => (
                    <AccordionItem key={index} bg={"#F5F5F5"} borderRadius={8}>
                      <AccordionButton color={"#0085C8"}>
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <AccordionIcon />
                            <p className="text-[#474A57] text-sm">
                              {mod.moduleName}
                            </p>
                          </div>
                          {/* <p className="text-[#959595] text-sm">NO ACCESS</p> */}
                        </div>
                      </AccordionButton>
                      <AccordionPanel padding={5}>
                        <div className="p flex flex-col gap-3">
                          <p className="text-sm text-[#656565]">
                            Select the permissions to give under this section
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {mod.policies.map((policy, index) => (
                              <Checkbox
                                key={index}
                                onChange={(e) => {
                                  handleSelectedPolicies(
                                    parseInt(e.target.value)
                                  );
                                }}
                                value={policy.id}
                                spacing={1}
                                fontSize={12}
                              >
                                {policy.policyName}
                              </Checkbox>
                            ))}
                          </div>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex items-center justify-end">
            <Button
              type="fit"
              text="Save"
              onClick={() => {
                onSubmit(role);
              }}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
