import { Fragment, useCallback, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IsLoadingSmall from '../IsLoadingSmall'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DropDownInfo({customer}) {
    const router = useRouter();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleLogout = useCallback(async() => {
      try {
        setIsButtonDisabled(true);
        router.push('/login');
        toast.success("Bạn đã đăng xuất thành công");
        window.localStorage.removeItem('TOKEN');
        window.localStorage.removeItem('REFRESH_TOKEN');
      } catch (error) {
        toast.error("Bạn đã đăng xuất thất bại");
        setIsButtonDisabled(false);
      }
    }, []);

  return (
    <Menu as="div" className="relative inline-block text-left text-2xl">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-2 font-semibold  ">
          {customer.firstName && customer.lastName ? `${customer.firstName} ${customer.lastName}` : <IsLoadingSmall/> }
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-lg md:text-xl lg:text-xl">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2'
                  )}
                >
                  Thông tin cá nhân
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/change-password"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2'
                  )}
                >
                  Thay đổi mật khẩu
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/don-mua"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2'
                  )}
                >
                  Đơn hàng của tôi
                </Link>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left'
                    )}
                    onClick={handleLogout}
                    disabled={isButtonDisabled}
                  >
                    Đăng xuất
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDownInfo;
