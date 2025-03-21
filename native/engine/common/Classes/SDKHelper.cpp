/** 
 * @Author: Gongxh
 * @Date: 2025-03-21
 * @Description: 
 */
#include "SDKHelper.h"

using namespace KunpoSDK;
namespace KunpoSDK {
}

static SDKHelper helper;

SDKHelper * SDKHelper::getInstance()
{
    return &helper;
}

SDKHelper::SDKHelper() { 

}

std::string SDKHelper::getVersionCode()
{
#if (CC_PLATFORM == CC_PLATFORM_ANDROID)
//    return ISdkKunpoHelper::getInstance()->getVersionCode();
#elif (CC_PLATFORM == CC_PLATFORM_IOS)

#endif
    CC_LOG_DEBUG("SDKHelper 获取版本号");
    return "0.0.1";
}

int SDKHelper::getBuildCode()
{
#if (CC_PLATFORM == CC_PLATFORM_ANDROID)
//    return ISdkKunpoHelper::getInstance()->getBuildCode();
#elif (CC_PLATFORM == CC_PLATFORM_IOS)

#endif
    CC_LOG_DEBUG("SDKHelper 获取Build号");
    return 0;
}